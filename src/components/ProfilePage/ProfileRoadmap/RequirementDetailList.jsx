import { Collapse, colors, Stack } from '@mui/material';
import Color from 'color';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import CourseOptionList from './CourseOptionList';
import RequirementHeading from './RequirementDetailList/RequirementHeading';

export default function RequirementDetailList({
  requirement,
  requirementIDPath,
  requirementProgressByID,
  expandedRequirementIDs,
  onRequirementIDPathIsExpandedChange,
  sx = {},
  hideHeading = false,
}) {
  const [stickyTop, setStickyTop] = useState(NaN);
  const [isExpanded, setIsExpanded] = useState(hideHeading);
  const [isShowingRoots, setIsShowingRoots] = useState(false);

  const headingRef = useRef();

  const updateStickyTop = useCallback(
    () => setStickyTop((sx.top || 0) + (headingRef?.current?.clientHeight || 0)),
    [hideHeading, expandedRequirementIDs, headingRef?.current?.clientHeight]
  );

  useEffect(() => {
    const handleWindowResize = updateStickyTop;
    window.addEventListener('resize', handleWindowResize);
    updateStickyTop();

    return () => window.removeEventListener('resize', handleWindowResize);
  }, [updateStickyTop]);

  useEffect(() => {
    if (hideHeading) return void setIsExpanded(true);

    setStickyTop((sx.top + 16 || 0) + (headingRef?.current?.clientHeight || 0));

    const newIsExpanded = hideHeading || expandedRequirementIDs.includes(requirement.id);
    setIsExpanded(newIsExpanded);

    if (
      (newIsExpanded !== isExpanded && !newIsExpanded) ||
      expandedRequirementIDs[expandedRequirementIDs.length - 1] === requirement.id
    )
      headingRef?.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [hideHeading, expandedRequirementIDs, headingRef?.current]);

  useEffect(
    () => setIsShowingRoots(requirement.subSets?.length && !requirement.subSets[0].rootSetID),
    [requirement]
  );

  const progress = requirementProgressByID[requirement.id];

  return (
    <Stack spacing='16px'>
      {!hideHeading && (
        <RequirementHeading
          ref={headingRef}
          hasSubsets={requirement.subSets?.length}
          title={requirement.setName}
          completed={progress?.completed}
          total={progress?.total}
          expanded={expandedRequirementIDs.includes(requirement.id)}
          onChange={() => onRequirementIDPathIsExpandedChange?.(requirementIDPath)}
          sx={{
            top: isExpanded && sx.top,
            zIndex: sx.zIndex,
            backgroundColor: sx.backgroundColor,
          }}
        />
      )}
      <TransitionGroup style={{ paddingLeft: !hideHeading && '48px', zIndex: sx.zIndex - 1 }}>
        {isExpanded && (
          <Collapse>
            {requirement.subSets?.length ? (
              requirement.subSets.map((subset, i) => (
                <RequirementDetailList
                  key={subset.id}
                  requirement={subset}
                  requirementIDPath={requirementIDPath.concat(subset.id)}
                  requirementProgressByID={requirementProgressByID}
                  expandedRequirementIDs={expandedRequirementIDs}
                  onRequirementIDPathIsExpandedChange={onRequirementIDPathIsExpandedChange}
                  sx={{
                    top: stickyTop,
                    zIndex: (sx.zIndex || -1) - 144 - i * 2,
                    backgroundColor: isShowingRoots && rootColors[i],
                  }}
                />
              ))
            ) : (
              // TODO Q: De-duplicating should be done in backend. Remove this once b/e has it.
              // <CourseOptionList courseIDs={requirement.courseList} />
              <CourseOptionList courseIDs={requirement.courseList} />
            )}
          </Collapse>
        )}
      </TransitionGroup>
    </Stack>
  );
}

const rootColors = [
  colors.green,
  colors.blue,
  colors.purple,
  colors.deepOrange,
  colors.cyan,
  colors.brown,
].map((color) => Color(color[500]).saturationl(25).lightness(41.7).hex());
