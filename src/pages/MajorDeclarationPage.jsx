import { Check, Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControlLabel,
  Grow,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
  Zoom,
} from '@mui/material';
import { declareMajor, fetchCollegeMajorList, fetchMajorEmphasisList } from 'api';
import { UserContext } from 'App';
import ContainerWithLoadingIndication from 'components/Page/ContainerWithLoadingIndication';
import { PreventableNavigationContext } from 'components/PreventableNavigation/ContainerWithPreventableNavigation';
import React, { useContext, useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useLocation } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { capitalizeFirst } from 'utils';

export default function MajorDeclarationPage() {
  const location = useLocation();

  const { user } = useContext(UserContext);
  const { navigateIfAllowed } = useContext(PreventableNavigationContext);

  const [currStep, setCurrStep] = useState(-1);
  const [majorOptions, setMajorOptions] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [areEmphasisOptionsLoading, setAreEmphasisOptionsLoading] = useState(false);
  const [emphasisOptions, setEmphasisOptions] = useState(null);
  const [selectedEmphasis, setSelectedEmphasis] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [isSavingLoading, setIsSavingLoading] = useState(false);

  const collegeID = 2;

  useEffect(() => {
    if (user === null)
      requestAnimationFrame(() => navigateIfAllowed('/', null, { replace: true }));

    fetchCollegeMajorList(collegeID).then((majors) =>
      setMajorOptions(majors.sort((x, y) => x.name.localeCompare(y.name)))
    );
    // Give the new user some time to read the welcome message on the top before showing the
    // major prompt.
    setTimeout(() => setCurrStep(0), location.state?.isNewUser ? 2000 : 0);
  }, [user]);

  const renderTop = () => (
    <Box backgroundColor='#eee' paddingY='72px'>
      <Container maxWidth='xl'>
        <Stack direction='row' paddingLeft='28px' spacing='96px' alignItems='center'>
          <IconButton
            sx={{
              pointerEvents: 'none',
              color: 'initial',
              backgroundColor: 'white',
              width: '180px',
              height: '180px',
            }}
          >
            <Zoom in style={{ transitionDelay: '0.25s' }}>
              <Typography variant='h2' component='span'>
                👋🏻
              </Typography>
            </Zoom>
          </IconButton>
          <Zoom in style={{ transitionDelay: '0.25s' }}>
            <Stack spacing='24px'>
              <Typography variant='h2' fontWeight={200} letterSpacing='-0.0278em'>
                Welcome to PickMyClasses, {user && capitalizeFirst(user.name.split(' ')[0])}!
              </Typography>
              <Typography variant='h6' color='text.secondary'>
                We're thrilled to join you on your college journey! Tell us a bit more about
                you.
              </Typography>
            </Stack>
          </Zoom>
        </Stack>
      </Container>
    </Box>
  );

  const handleMajorSelectionContinue = () => {
    if (!selectedMajor) return void setCurrStep(2);

    setAreEmphasisOptionsLoading(true);
    fetchMajorEmphasisList(collegeID, selectedMajor.name).then((emphases) => {
      setAreEmphasisOptionsLoading(false);
      setEmphasisOptions(emphases.sort((x, y) => x.name.localeCompare(y.name)));
      setCurrStep(emphases.length ? 1 : 2);
    });
  };

  const renderMajorSelection = () => (
    <Stack spacing='24px' paddingY='24px'>
      <Stack direction='row' spacing='24px' alignItems='center'>
        <Typography variant='h5'>What is your major?</Typography>
        {currStep > 0 && (
          <Stack direction='row' spacing='12px' alignItems='center' color='success.dark'>
            <Check />
            <Typography variant='h6' marginLeft='24px'>
              {selectedMajor?.name || 'N/A'}
            </Typography>
            <IconButton
              onClick={() => {
                setCurrStep(0);
                setEmphasisOptions(null);
              }}
            >
              <Edit />
            </IconButton>
          </Stack>
        )}
      </Stack>
      {currStep === 0 && (
        <Stack alignSelf='center' direction='row' spacing='12px' alignItems='center'>
          <Autocomplete
            noOptionsText={
              majorOptions.length ? 'Sorry, your major is not on our list' : 'Loading majors...'
            }
            options={majorOptions}
            groupBy={(option) => option.name.charAt(0).toUpperCase()}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            value={selectedMajor}
            renderInput={({ inputProps, ...props }) => (
              <TextField
                {...props}
                inputProps={{ ...inputProps, sx: { paddingY: '4px !important' } }}
              />
            )}
            sx={{ width: '432px', marginRight: '12px' }}
            onChange={(_, option) => {
              setSelectedMajor(option);
              setSelectedEmphasis(null);
            }}
          />
          <LoadingButton
            variant='contained'
            sx={{ height: 'fit-content' }}
            disabled={!selectedMajor}
            loading={areEmphasisOptionsLoading}
            onClick={handleMajorSelectionContinue}
          >
            Continue
          </LoadingButton>
          <Button color='inherit' onClick={handleMajorSelectionContinue}>
            Skip
          </Button>
        </Stack>
      )}
    </Stack>
  );

  const renderEmphasisSelection = () => (
    <Stack spacing='24px' paddingY='24px'>
      <Stack direction='row' spacing='24px' alignItems='center'>
        <Typography variant='h5'>What emphasis?</Typography>
        {currStep > 1 && (
          <Stack direction='row' spacing='12px' alignItems='center' color='success.dark'>
            <Check />
            <Typography variant='h6' marginLeft='24px'>
              {selectedEmphasis || 'No Emphasis'}
            </Typography>
            <IconButton onClick={() => setCurrStep(1)}>
              <Edit />
            </IconButton>
          </Stack>
        )}
      </Stack>
      {currStep === 1 && (
        <Stack alignSelf='center' direction='row' spacing='24px' alignItems='center'>
          <Select
            value={selectedEmphasis || (selectedMajor.emphasisRequired ? '' : 'No Emphasis')}
            onChange={(e) => setSelectedEmphasis(e.target.value)}
            sx={{ width: '432px' }}
          >
            {!selectedMajor.emphasisRequired && (
              <MenuItem value='No Emphasis' divider>
                No Emphasis
              </MenuItem>
            )}
            {emphasisOptions.map(({ name }) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant='contained'
            sx={{ height: 'fit-content' }}
            disabled={selectedMajor.emphasisRequired && !selectedEmphasis}
            onClick={() => setCurrStep(2)}
          >
            Continue
          </Button>
        </Stack>
      )}
    </Stack>
  );

  const renderYearSelection = () => (
    <Stack spacing='24px' paddingY='24px'>
      <Stack direction='row' spacing='24px' alignItems='center'>
        <Typography variant='h5'>What year are you?</Typography>
        {currStep > 2 && (
          <Stack direction='row' spacing='12px' alignItems='center' color='success.dark'>
            <Check />
            <Typography variant='h6' marginLeft='24px'>
              {yearLabels[selectedYear]}
            </Typography>
            <IconButton onClick={() => setCurrStep(2)}>
              <Edit />
            </IconButton>
          </Stack>
        )}
      </Stack>
      {currStep === 2 && (
        <Stack spacing='24px' paddingX='96px'>
          <RadioGroup
            row
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            sx={{ justifyContent: 'space-around' }}
          >
            {yearLabels.map((x, i) => (
              <FormControlLabel key={i} control={<Radio />} value={i} label={x} />
            ))}
          </RadioGroup>
          <Button
            sx={{ alignSelf: 'flex-end' }}
            variant='contained'
            onClick={() => setCurrStep(3)}
          >
            Continue
          </Button>
        </Stack>
      )}
    </Stack>
  );

  const renderCompleteIndication = () => (
    <Stack
      paddingY='48px'
      spacing='48px'
      direction='row'
      alignItems='center'
      justifyContent='center'
    >
      <Typography variant='h6' color='text.secondary'>
        Thanks for the info. Now please enjoy using PMC!
      </Typography>
      <LoadingButton
        variant='contained'
        size='large'
        loading={isSavingLoading}
        onClick={() => {
          setIsSavingLoading(true);
          declareMajor(
            user.userID,
            selectedMajor?.name,
            selectedEmphasis === 'No Emphasis' ? undefined : selectedEmphasis,
            (+selectedYear + 1).toString()
          ).then(() => navigateIfAllowed(location.state?.linkTo || '/'));
        }}
      >
        Start Now!
      </LoadingButton>
    </Stack>
  );

  const steps = [
    renderMajorSelection,
    emphasisOptions?.length > 0 && renderEmphasisSelection,
    renderYearSelection,
    renderCompleteIndication,
  ];

  return (
    <Box width='100%' height='100%' backgroundColor='white'>
      <ContainerWithLoadingIndication isLoading={!user}>
        <Scrollbars autoHide>
          {renderTop()}
          <Container maxWidth='xl'>
            <Box padding='48px'>
              <TransitionGroup>
                {steps.slice(0, currStep + 1).map((x, i) => x && <Grow key={i}>{x()}</Grow>)}
              </TransitionGroup>
            </Box>
          </Container>
        </Scrollbars>
      </ContainerWithLoadingIndication>
    </Box>
  );
}

const yearLabels = [
  'Freshman / 1st year',
  'Sophomore / 2nd year',
  'Junior / 3rd year',
  'Senior / 4th year',
];
