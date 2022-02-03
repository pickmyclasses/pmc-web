/* TODO Q: This entire file needs refactor. Here are some aspects to consider in the refactor
 * (this list may not be exhaustive):
 *  1. The file name, which does not match what it exports by default, and the content of this *     file, which contains more than one components and pieces of complex logic.
 *  2. The code style, including notably the following elements:
 *       - Detached import statements of items from the same directory
 *       - Inconsistent function declarations: mixture of using lambda and `function` keywords
 *       - Use of `let` variable instead of a state
 *       - Superfluous helper functions, often involving complex implementations of simple logic
 *       - Some irregular casing or construction in names of variables and function arguments
 *  3. The design. The name `EnhancedTable` implies more general use cases than for displaying
 *     class listing only. So, the props and constants of the table should not defined locally
 *     specifically for showing classes. Instead, the table component should be structured and
 *     developed in a way that promotes reusability and abstraction. Best if it can be adopted
 *     anywhere in the project.
 *  4. The way it uses "offer date" as the key for recording and identifying selections, which
 *     fails to work when there are multiple class offerings with the same offer date.
 * Although, refactor of this file should not be a top priority, at least not carried out before
 * a more clarified UX design. */

import * as React from 'react';

import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import CourseRating from '../../components/CourseDetails/CourseRating';
import { SchedulerDisplayContentContext } from '../../pages/PageWithScheduler';
import { CourseContext } from '../../pages/CoursePage';

function createData(OfferDate, Location, Section, RecommendationScore, Professor) {
  return {
    OfferDate,
    Location,
    Section,
    RecommendationScore,
    Professor,
  };
}

let rows;

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'OfferDate',
    numeric: false,
    disablePadding: true,
    label: 'Offer Date',
  },
  {
    id: 'Location',
    numeric: true,
    disablePadding: false,
    label: 'Location',
  },
  {
    id: 'Section',
    numeric: true,
    disablePadding: false,
    label: 'Section',
  },
  {
    id: 'RecommendationScore',
    numeric: true,
    disablePadding: false,
    label: 'Recommendation Score',
  },
  {
    id: 'Professor',
    numeric: true,
    disablePadding: false,
    label: 'Professor',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
          Classes
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

// TODO Q: As iterated many times, fix it and do not use OfferDate as the key.
const formatOfferDate = (classData) =>
  `${classData['OfferDate']} ${classData['StartTime']} – ${classData['EndTime']}`;

function initRowData(classes) {
  let rows = [];
  for (let classData of classes) {
    const offerDate = formatOfferDate(classData);
    const location = classData['Location'];
    const section = classData['Session'];
    // TODO (QC): No recommendation score provided in the backend. Possibly remove this as
    // reviews are for the course and not for a class.
    const recommendationScore = 3;
    const professor = classData['Instructor'];
    const row = createData(offerDate, location, section, recommendationScore, professor);
    rows.push(row);
  }
  return rows;
}

export default function EnhancedTable({ classes }) {
  rows = initRowData(classes);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('offerDate');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { setClassesToHighlight } = React.useContext(SchedulerDisplayContentContext);
  const course = React.useContext(CourseContext);

  React.useEffect(() => setSelected([]), [classes]);

  React.useEffect(() => {
    // selected is a list of offer dates (TODO Q: fix this during refactor), therefore generate
    // the corresponding list of classes to highlight.
    const selectedClasses = selected
      .map((OfferDate) => classes.find((classData) => OfferDate === formatOfferDate(classData)))
      .filter(Boolean)
      .map((classData) => ({ classData, course }));
    setClassesToHighlight(selectedClasses);
    console.log('** hl', selectedClasses, selected, classes);
  }, [classes, course, selected, setClassesToHighlight]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.OfferDate);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, OfferDate) => {
    const selectedIndex = selected.indexOf(OfferDate);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, OfferDate);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (OfferDate) => selected.indexOf(OfferDate) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.OfferDate);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.OfferDate)}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          color='primary'
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell component='th' id={labelId} scope='row' padding='none'>
                        {row.OfferDate}
                      </TableCell>
                      <TableCell align='right'>{row.Location}</TableCell>
                      <TableCell align='right'>{row.Section}</TableCell>
                      <TableCell align='right'>
                        <CourseRating value={row.RecommendationScore} />
                      </TableCell>

                      <TableCell align='right'>{row.Professor}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label='Dense padding'
      />
    </Box>
  );
}
