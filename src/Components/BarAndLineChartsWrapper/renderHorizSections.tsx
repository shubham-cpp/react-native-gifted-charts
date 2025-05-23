import React from 'react';
import {Text, View} from 'react-native';
import Rule from '../lineSvg';
import {styles} from '../../LineChart/styles';
import {
  getHorizSectionVals,
  yAxisSides,
  HorizSectionsType,
  horizSectionPropTypes,
  chartTypes,
} from 'gifted-charts-core';

export const renderHorizSections = (props: horizSectionPropTypes) => {
  const {
    chartType,
    width,
    noOfSectionsBelowXAxis,
    totalWidth,
    endSpacing,
    yAxisSide,
    horizontalRulesStyle,
    noOfSections,
    sectionColors,
    stepHeight,
    negativeStepHeight,
    yAxisLabelWidth,
    yAxisLabelContainerStyle,
    yAxisThickness,
    yAxisColor,
    xAxisThickness,
    xAxisColor,
    xAxisLength,
    xAxisType,
    dashWidth,
    dashGap,
    backgroundColor,
    hideRules,
    rulesLength,
    rulesType,
    rulesThickness,
    rulesColor,
    rulesConfigArray,
    spacing,
    showYAxisIndices,
    yAxisIndicesHeight,
    yAxisIndicesWidth,
    yAxisIndicesColor,

    hideOrigin,
    hideYAxisText,
    yAxisTextNumberOfLines,
    yAxisTextStyle,
    rotateYAxisTexts,
    rtl,

    containerHeight,
    maxValue,
    yAxisOffset,

    horizontal,
    yAxisAtTop,
    secondaryYAxis,
    onlyReferenceLines,
    renderReferenceLines,
    secondaryXAxis,
    customBackground,
  } = props;

  const {
    secondaryYAxisConfig,
    horizSections,
    yAxisExtraHeightAtTop,
    secondaryHorizSections,
    showReferenceLine1,
    referenceLine1Config,
    referenceLine1Position,
    showReferenceLine2,
    referenceLine2Config,
    referenceLine2Position,
    showReferenceLine3,
    referenceLine3Config,
    referenceLine3Position,
    horizSectionsBelow,
    secondaryHorizSectionsBelow,
    getLabelTexts,
    getLabelTextsForSecondaryYAxis,
  } = getHorizSectionVals(props);

  const secondaryYAxisExtraHeightAtBottom = 10;

  const negativeSectionsCountDiffPrimaryVsSecondary =
    secondaryHorizSectionsBelow.length - horizSectionsBelow.length;

  const isLineChart = chartType === chartTypes.LINE;
  const isLineBiColor = chartType === chartTypes.LINE_BI_COLOR;

  const renderAxesAndRules = (index: number) => {
    const invertedIndex = horizSections.length - index - 1;
    const rulesConfigArrayLocal = rulesConfigArray[invertedIndex - 1];
    return (
      <View
        style={[
          index === noOfSections
            ? styles.lastLeftPart
            : !index
              ? {justifyContent: 'flex-start'}
              : styles.leftPart,
          {
            borderColor: yAxisColor,
            backgroundColor: sectionColors?.[invertedIndex] ?? backgroundColor,
            width: (props.width || totalWidth - spacing) + endSpacing,
          },
          !index ? {height: stepHeight / 2, marginTop: stepHeight / 2} : null,
          yAxisSide === yAxisSides.RIGHT
            ? {borderRightWidth: yAxisThickness}
            : {borderLeftWidth: yAxisThickness},
        ]}>
        {index === noOfSections ? (
          <Rule
            config={{
              thickness: xAxisThickness,
              color: xAxisColor,
              width:
                xAxisLength ||
                (props.width || totalWidth - spacing) + endSpacing,
              dashWidth: dashWidth,
              dashGap: dashGap,
              type: xAxisType,
            }}
          />
        ) : hideRules ? null : (
          <Rule
            config={{
              thickness:
                rulesConfigArrayLocal?.rulesThickness ?? rulesThickness,
              color: rulesConfigArrayLocal?.rulesColor ?? rulesColor,
              width:
                rulesConfigArrayLocal?.rulesLength ??
                rulesLength ??
                (props.width || totalWidth - spacing) + endSpacing,
              dashWidth: rulesConfigArrayLocal?.dashWidth ?? dashWidth,
              dashGap: rulesConfigArrayLocal?.dashGap ?? dashGap,
              type: rulesConfigArrayLocal?.rulesType ?? rulesType,
            }}
          />
        )}
        {showYAxisIndices && index !== noOfSections ? (
          <View
            style={{
              position: 'absolute',
              height: yAxisIndicesHeight,
              width: yAxisIndicesWidth,
              left:
                yAxisIndicesWidth / -2 +
                (yAxisSide === yAxisSides.RIGHT
                  ? (width ?? totalWidth) +
                    yAxisLabelWidth / 2 +
                    yAxisIndicesWidth / 4
                  : 0),
              backgroundColor: yAxisIndicesColor,
            }}
          />
        ) : null}
      </View>
    );
  };

  const renderExtraHeightOfYAxisAtTop = () => (
    <View
      style={[
        styles.horizBar,
        {
          width: (width ?? totalWidth) + endSpacing,
          top: stepHeight / 2,
        },
        horizontal &&
          !yAxisAtTop && {
            transform: [{rotateY: '180deg'}],
          },
        horizontalRulesStyle,
      ]}>
      <View
        style={[
          styles.leftLabel,
          {
            height: yAxisExtraHeightAtTop,
            width: yAxisSide === yAxisSides.RIGHT ? 0 : yAxisLabelWidth,
          },
          yAxisLabelContainerStyle,
        ]}
      />
      <View
        style={[
          styles.leftPart,
          {
            borderLeftColor: yAxisColor,
            borderRightColor: yAxisColor,
            borderTopColor: secondaryXAxis?.color ?? xAxisColor,
            borderTopWidth: secondaryXAxis
              ? (secondaryXAxis.thickness ?? xAxisThickness)
              : 0,
            backgroundColor: backgroundColor,
            width: (props.width || totalWidth - spacing) + endSpacing,
          },
          yAxisSide === yAxisSides.RIGHT
            ? {borderRightWidth: yAxisThickness}
            : {borderLeftWidth: yAxisThickness},
        ]}
      />
    </View>
  );

  const renderSecondaryYaxisLabels = (
    horizSections: HorizSectionsType,
    isBelow: boolean,
  ) => {
    return horizSections.map((sectionItems, index) => {
      let label = getLabelTextsForSecondaryYAxis(sectionItems.value, index);
      if (secondaryYAxisConfig.hideOrigin && index === 0) {
        label = '';
      }
      return (
        <View
          key={index}
          style={[
            styles.horizBar,
            styles.leftLabel,
            {
              position: 'absolute',
              zIndex: 1,
              bottom:
                (index - 0.5) *
                  (isBelow
                    ? (secondaryYAxisConfig.negativeStepHeight ??
                      secondaryYAxisConfig.stepHeight ??
                      0)
                    : (secondaryYAxisConfig.stepHeight ?? 0)) +
                (isBelow ? secondaryYAxisExtraHeightAtBottom : 0),
              width: secondaryYAxisConfig.yAxisLabelWidth,
              height: isBelow
                ? (secondaryYAxisConfig.negativeStepHeight ??
                  secondaryYAxisConfig.stepHeight ??
                  0)
                : (secondaryYAxisConfig.stepHeight ?? 0),
            },
            secondaryYAxisConfig.yAxisLabelContainerStyle ??
              yAxisLabelContainerStyle,
          ]}>
          {secondaryYAxisConfig.showYAxisIndices && (index !== 0 || isBelow) ? (
            <View
              style={{
                height: secondaryYAxisConfig.yAxisIndicesHeight,
                width: secondaryYAxisConfig.yAxisIndicesWidth,
                position: 'absolute',
                left: (secondaryYAxisConfig.yAxisIndicesWidth ?? 0) / -2,
                backgroundColor: secondaryYAxisConfig.yAxisIndicesColor,
              }}
            />
          ) : null}
          <Text
            numberOfLines={secondaryYAxisConfig.yAxisTextNumberOfLines}
            ellipsizeMode={'clip'}
            style={[
              {
                textAlign: 'left',
                width:
                  secondaryYAxisConfig.yAxisLabelContainerStyle?.width ??
                  secondaryYAxisConfig.yAxisLabelWidth,
                marginLeft: 10,
              },
              secondaryYAxisConfig.yAxisTextStyle,
            ]}>
            {label}
          </Text>
        </View>
      );
    });
  };

  const referenceLines = () => {
    return (
      <>
        {showReferenceLine1 ? (
          <View
            style={{
              position: 'absolute',
              zIndex: referenceLine1Config.zIndex,
              bottom:
                ((referenceLine1Position - (yAxisOffset ?? 0)) *
                  containerHeight) /
                maxValue,
              left:
                yAxisSide === yAxisSides.RIGHT
                  ? 0
                  : yAxisLabelWidth + yAxisThickness,
            }}>
            <Rule config={referenceLine1Config} />
            {referenceLine1Config.labelText ? (
              <Text
                style={[
                  {position: 'absolute'},
                  referenceLine1Config.labelTextStyle,
                ]}>
                {referenceLine1Config.labelText}
              </Text>
            ) : null}
          </View>
        ) : null}
        {showReferenceLine2 ? (
          <View
            style={{
              position: 'absolute',
              zIndex: referenceLine2Config.zIndex,
              bottom:
                ((referenceLine2Position - (yAxisOffset ?? 0)) *
                  containerHeight) /
                maxValue,
              left:
                yAxisSide === yAxisSides.RIGHT
                  ? 0
                  : yAxisLabelWidth + yAxisThickness,
            }}>
            <Rule config={referenceLine2Config} />
            {referenceLine2Config.labelText ? (
              <Text
                style={[
                  {position: 'absolute'},
                  referenceLine2Config.labelTextStyle,
                ]}>
                {referenceLine2Config.labelText}
              </Text>
            ) : null}
          </View>
        ) : null}
        {showReferenceLine3 ? (
          <View
            style={{
              position: 'absolute',
              zIndex: referenceLine3Config.zIndex,
              bottom:
                ((referenceLine3Position - (yAxisOffset ?? 0)) *
                  containerHeight) /
                maxValue,
              left:
                yAxisSide === yAxisSides.RIGHT
                  ? 0
                  : yAxisLabelWidth + yAxisThickness,
            }}>
            <Rule config={referenceLine3Config} />
            {referenceLine3Config.labelText ? (
              <Text
                style={[
                  {position: 'absolute'},
                  referenceLine3Config.labelTextStyle,
                ]}>
                {referenceLine3Config.labelText}
              </Text>
            ) : null}
          </View>
        ) : null}
      </>
    );
  };

  const horizSectionsBelowRenderer = (index: number, showBorder: boolean) => {
    // negative sections height will correspond to negative Y-axis config in case there are extra negative horiz sections corresponding to the secondary Y axis
    const localNegativeStepHeight = !showBorder
      ? (secondaryYAxisConfig.negativeStepHeight ?? negativeStepHeight)
      : negativeStepHeight;
    return (
      <View
        key={index}
        style={[
          styles.horizBar,
          {
            width: (width ?? totalWidth) + 15,
          },
          index === 0 && {marginTop: localNegativeStepHeight / 2},
        ]}>
        <View
          style={[
            styles.leftLabel,
            {
              marginLeft: yAxisThickness,
            },
            {
              height:
                index === 0
                  ? localNegativeStepHeight * 1.5
                  : localNegativeStepHeight,
              width: yAxisSide === yAxisSides.RIGHT ? 0 : yAxisLabelWidth,
            },
            index === 0 && {marginTop: -localNegativeStepHeight / 2},
          ]}
        />
        <View
          style={{
            position: 'absolute',
            top: index === 0 ? -localNegativeStepHeight / 2 : 0,
            left:
              yAxisSide === yAxisSides.RIGHT
                ? width
                  ? width + 19
                  : totalWidth -
                    (isLineChart ? 31 : isLineBiColor ? spacing - 19 : 1)
                : yAxisLabelWidth,
            borderRightWidth: yAxisThickness,
            borderColor: yAxisColor,
            height:
              index === 0
                ? localNegativeStepHeight * 1.5
                : localNegativeStepHeight,
          }}
        />
        <View style={[styles.leftPart, {backgroundColor: backgroundColor}]}>
          {hideRules ? null : (
            <Rule
              config={{
                thickness: rulesThickness,
                color: rulesColor,
                width:
                  rulesLength ||
                  (props.width || totalWidth - spacing) + endSpacing,
                dashWidth: dashWidth,
                dashGap: dashGap,
                type: rulesType,
              }}
            />
          )}
        </View>
      </View>
    );
  };

  const leftShiftForRIghtYaxis =
    (width ? width + (isLineChart ? 50 : 20) : totalWidth) +
    yAxisLabelWidth / 2 +
    endSpacing -
    (isLineChart ? 70 : 40);

  return (
    <>
      {onlyReferenceLines ? (
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={{width: (width ?? totalWidth) + endSpacing}}>
            {referenceLines()}
          </View>
        </View>
      ) : (
        <View
          pointerEvents="none"
          style={{
            flexDirection: 'row',
            marginTop: stepHeight / -2,
          }}>
          <View style={{width: (width ?? totalWidth) + endSpacing}}>
            {customBackground ? (
              <View
                style={{
                  position: 'absolute',
                  backgroundColor: customBackground.color,
                  width:
                    customBackground.width ??
                    (width ?? totalWidth) +
                      endSpacing -
                      9 +
                      (customBackground.widthAdjustment ?? 0),
                  height: customBackground.height ?? '100%',
                  left:
                    yAxisLabelWidth + (customBackground.horizontalShift ?? 0),
                  top: customBackground.verticalShift ?? 0,
                }}>
                {customBackground.component
                  ? customBackground.component()
                  : null}
              </View>
            ) : null}
            {yAxisExtraHeightAtTop ? renderExtraHeightOfYAxisAtTop() : null}
            {horizSections.map((sectionItems, index) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.horizBar,
                    {
                      width: (width ?? totalWidth) + endSpacing,
                    },
                    horizontal &&
                      !yAxisAtTop && {
                        transform: [{rotateY: '180deg'}],
                      },
                    horizontalRulesStyle,
                  ]}>
                  <View
                    style={[
                      styles.leftLabel,
                      {
                        height:
                          index === noOfSections ? stepHeight / 2 : stepHeight,
                        width:
                          yAxisSide === yAxisSides.RIGHT ? 0 : yAxisLabelWidth,
                      },
                      yAxisLabelContainerStyle,
                    ]}
                  />
                  {renderAxesAndRules(index)}
                </View>
              );
            })}

            {
              /***********************************************************************************************/
              /**************************      Render the y axis labels separately      **********************/
              /***********************************************************************************************/

              !hideYAxisText &&
                horizSections.map((sectionItems, index) => {
                  let label = getLabelTexts(sectionItems.value, index);
                  if (hideOrigin && index === horizSections.length - 1) {
                    label = '';
                  }
                  return (
                    <View
                      key={index}
                      style={[
                        styles.horizBar,
                        styles.leftLabel,
                        {
                          position: 'absolute',
                          zIndex: 1,
                          top: stepHeight * index + yAxisExtraHeightAtTop,
                          width: yAxisLabelWidth,
                          height:
                            index === noOfSections
                              ? stepHeight / 2
                              : stepHeight,
                        },
                        yAxisSide === yAxisSides.RIGHT && {
                          left: leftShiftForRIghtYaxis,
                        },
                        horizontal &&
                          !yAxisAtTop && {
                            transform: [
                              {
                                translateX:
                                  (width ?? totalWidth) - 30 + endSpacing,
                              },
                            ],
                          },
                        yAxisLabelContainerStyle,
                      ]}>
                      <Text
                        numberOfLines={yAxisTextNumberOfLines}
                        ellipsizeMode={'clip'}
                        style={[
                          yAxisTextStyle,
                          horizontal && {
                            transform: [
                              {
                                rotate: `${
                                  rotateYAxisTexts ?? (rtl ? 90 : -90)
                                }deg`,
                              },
                            ],
                          },
                          index === noOfSections && {
                            marginBottom: stepHeight / -2,
                          },
                        ]}>
                        {label}
                      </Text>
                    </View>
                  );
                })
              /***********************************************************************************************/
              /***********************************************************************************************/
            }

            {horizSectionsBelow.map((_, index) =>
              horizSectionsBelowRenderer(index, true),
            )}

            {
              /***********************************************************************************************/
              /*     If more -ve sections in Secondary Y-axis, then we need to render the Rules for them     */
              /***********************************************************************************************/

              secondaryYAxis && negativeSectionsCountDiffPrimaryVsSecondary > 0
                ? [
                    ...Array(
                      negativeSectionsCountDiffPrimaryVsSecondary,
                    ).keys(),
                  ].map((_, index) => horizSectionsBelowRenderer(index, false))
                : null
            }

            {
              /***********************************************************************************************/
              /*************************      Render the y axis labels below origin      *********************/
              /***********************************************************************************************/

              !hideYAxisText &&
                horizSectionsBelow.map((_, index) => {
                  const invertedIndex = horizSectionsBelow.length - 1 - index;
                  let label = getLabelTexts(
                    horizSectionsBelow[invertedIndex].value,
                    index,
                  );
                  return (
                    <View
                      key={index}
                      style={[
                        styles.horizBar,
                        styles.leftLabel,
                        {
                          position: 'absolute',
                          zIndex: 1,
                          top:
                            containerHeight +
                            negativeStepHeight * (invertedIndex + 1) +
                            yAxisExtraHeightAtTop,
                          width: yAxisLabelWidth,
                          height:
                            index === noOfSectionsBelowXAxis
                              ? negativeStepHeight / 2
                              : negativeStepHeight,
                        },
                        yAxisSide === yAxisSides.RIGHT && {
                          left:
                            (width
                              ? width - 15
                              : totalWidth - (isLineChart ? 65 : 35)) +
                            yAxisLabelWidth,
                        },
                        yAxisLabelContainerStyle,
                      ]}>
                      <Text
                        numberOfLines={yAxisTextNumberOfLines}
                        ellipsizeMode={'clip'}
                        style={[
                          yAxisTextStyle,
                          index === noOfSectionsBelowXAxis && {
                            marginBottom: negativeStepHeight / -2,
                          },
                        ]}>
                        {label}
                      </Text>
                    </View>
                  );
                })
              /***********************************************************************************************/
              /***********************************************************************************************/
            }

            {/***********************************************************************************************/
            /*************************      Render the reference lines separately      *********************/
            /***********************************************************************************************/}

            {renderReferenceLines ? referenceLines() : null}
          </View>
          {
            /***********************************************************************************************/
            /*************************      Render the secondary Y Axis                *********************/
            /***********************************************************************************************/
            secondaryYAxis ? (
              <View
                style={{
                  width: secondaryYAxisConfig.yAxisLabelWidth,
                  left: width ? yAxisLabelWidth : yAxisLabelWidth - spacing,
                  borderColor: secondaryYAxisConfig.yAxisColor,
                  borderLeftWidth: secondaryYAxisConfig.yAxisThickness,
                  height: containerHeight + yAxisExtraHeightAtTop,
                  bottom: stepHeight / -2,
                }}>
                {!secondaryYAxisConfig.hideYAxisText
                  ? renderSecondaryYaxisLabels(secondaryHorizSections, false)
                  : null}
              </View>
            ) : null
          }

          {
            /***********************************************************************************************/
            /*************************      Render the secondary Y Axis below origin   *********************/
            /***********************************************************************************************/

            secondaryYAxis && secondaryYAxisConfig.noOfSectionsBelowXAxis ? (
              <View
                style={{
                  width:
                    secondaryYAxisConfig.yAxisLabelWidth ?? yAxisLabelWidth,
                  left:
                    (width ? yAxisLabelWidth : yAxisLabelWidth - spacing) -
                    (secondaryYAxisConfig.yAxisLabelWidth ?? yAxisLabelWidth),
                  borderColor: secondaryYAxisConfig.yAxisColor,
                  borderLeftWidth: secondaryYAxisConfig.yAxisThickness,
                  height:
                    (secondaryYAxisConfig.negativeStepHeight ??
                      secondaryYAxisConfig.stepHeight ??
                      stepHeight) *
                      secondaryHorizSectionsBelow.length +
                    secondaryYAxisExtraHeightAtBottom,
                  bottom:
                    -containerHeight - stepHeight / 2 - yAxisExtraHeightAtTop,
                }}>
                {!secondaryYAxisConfig.hideYAxisText
                  ? renderSecondaryYaxisLabels(
                      secondaryHorizSectionsBelow,
                      true,
                    )
                  : null}
              </View>
            ) : null
          }
        </View>
      )}
    </>
  );
};
