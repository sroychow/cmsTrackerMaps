//things that we are using because of limitations of the web GUI
//eg, inability to display fully functional interactive FED maps with diffviews
//  -> therefore disabling things that dont work
var mapDescriptions =
{
  "BAD MODULES":
  [
    {"name" : "Quality tests",                     "resource" : "QTestAlarm.png",     "emptyMap" : "img/tkMapEmpty.png"},
    {"name" : "Quality tests - FED view",          "resource" : "QTestAlarm_fed.png", "emptyMap" : "img/fedMapEmpty.png"},
    {"name" : "Quality tests - PSU view",          "resource" : "QTestAlarm_psu.png", "emptyMap" : "img/psuMapEmpty.png"},
  ],

  "LIST":
  [
    {"name" : "BAD modules from quality tests",                        "resource" : "QualityTest_run.txt"},
    {"name" : "Modules with the highest values",                       "resource" : "TopModulesList.log"},
    {"name" : "Components found by the prompt calibration loop",       "resource" : "PCLBadComponents.log"}
  ],

  "NUMBER OF":
  [
    {"name" : "Digis per module",                                    "resource" : "NumberOfDigi.png",                         "emptyMap" : "img/tkMapEmpty.png"},
    {"name" : "Clusters per module",                                 "resource" : "NumberOfCluster.png",                      "emptyMap" : "img/tkMapEmpty.png"},
    {"name" : "APV shots per module",                                "resource" : "NApvShots.png",                            "emptyMap" : "img/tkMapEmpty.png"},
    {"name" : "Clusters on-track per module",                        "resource" : "NumberOfOnTrackCluster.png",               "emptyMap" : "img/tkMapEmpty.png"},
    {"name" : "Clusters off-track per module",                       "resource" : "NumberOfOfffTrackCluster.png",             "emptyMap" : "img/tkMapEmpty.png"},
    {"name" : "Clusters off-track per module - Automatic scale",     "resource" : "NumberOfOfffTrackCluster_autoscale.png",   "emptyMap" : "img/tkMapEmpty.png"},
    {"name" : "Inactive hits per module",                            "resource" : "NumberInactiveHits.png",                   "emptyMap" : "img/tkMapEmpty.png"},
    {"name" : "Missing hits per module",                             "resource" : "NumberMissingHits.png",                    "emptyMap" : "img/tkMapEmpty.png"},
    {"name" : "Valid hits per module",                               "resource" : "NumberValidHits.png",                      "emptyMap" : "img/tkMapEmpty.png"}
  ],

  "MISC":
  [
    {"name" : "Mean value for S/N for on-track cluster corrected for the angle",            "resource" :"StoNCorrOnTrack.png",          "emptyMap" : "img/tkMapEmpty.png"},
    {"name" : "Mean value for Cluster Charge per cm from Track",                            "resource" :"ChargePerCMfromTrack.png",     "emptyMap" : "img/tkMapEmpty.png"},
    {"name" : "Merged Bad components (PCL + FED Err + Cabling)",                            "resource" :"MergedBadComponentsTkMap.png", "emptyMap" : "img/tkMapEmpty.png"},
    {"name" : "Merged Bad components (PCL + FED Err + Cabling) - Log",                      "resource" :"MergedBadComponents_run.txt",  "emptyMap" : "img/tkMapEmpty.png"},
    {"name" : "FED errors per modules",                                                     "resource" :"FractionOfBadChannels.png",    "emptyMap" : "img/tkMapEmpty.png"},
    {"name" : "Fraction of bad components per module found by the prompt calibration loop", "resource" :"PCLBadComponents.png",         "emptyMap" : "img/tkMapEmpty.png"},
    {"name" : "Type of bad components per module found by the prompt calibration loop",     "resource" :"PCLBadComponents_Run_.png",    "emptyMap" : "img/tkMapEmpty.png"}
  ],

  "PIXEL":
  [
    {"name" : "Cluster Charge On Track",                 "resource" :"Tcharge.png",                  "emptyMap" : "img/pxMapEmpty.png"},
    {"name" : "Hits Efficiency",                         "resource" :"Thitefficiency.png",           "emptyMap" : "img/pxMapEmpty.png"},
    {"name" : "Missing Hits",                            "resource" :"Tmissing.png",                 "emptyMap" : "img/pxMapEmpty.png"},
    {"name" : "Number of Clusters On-track",             "resource" :"Tnum_clusters_ontrack.png",    "emptyMap" : "img/pxMapEmpty.png"},
    {"name" : "Residual X",                              "resource" :"Tresidual_x.png",              "emptyMap" : "img/pxMapEmpty.png"},
    {"name" : "Residual Y",                              "resource" :"Tresidual_y.png",              "emptyMap" : "img/pxMapEmpty.png"},
    {"name" : "Cluster Size On Track",                   "resource" :"Tsize.png",                    "emptyMap" : "img/pxMapEmpty.png"},
    {"name" : "Number of Valid Hits",                    "resource" :"Tvalid.png",                   "emptyMap" : "img/pxMapEmpty.png"},
    {"name" : "Digi ADC",                                "resource" :"adc.png",                      "emptyMap" : "img/pxMapEmpty.png"},
    {"name" : "Total Number of Clusters",                "resource" :"num_clusters.png",             "emptyMap" : "img/pxMapEmpty.png"},
    {"name" : "Total Number of Digis",                   "resource" :"num_digis.png",                "emptyMap" : "img/pxMapEmpty.png"},
    {"name" : "Inclusive Cluster Size",                  "resource" :"size.png",                     "emptyMap" : "img/pxMapEmpty.png"},
    {"name" : "Inclusive Cluster Size",                  "resource" :"charge.png",                   "emptyMap" : "img/pxMapEmpty.png"},
    {"name" : "Inclusive Cluster Size",                  "resource" :"Trechitsize_x.png",            "emptyMap" : "img/pxMapEmpty.png"},
    {"name" : "Inclusive Cluster Size",                  "resource" :"Trechitsize_y.png",            "emptyMap" : "img/pxMapEmpty.png"},
    {"name" : "Inclusive Cluster Size",                  "resource" :"minmax.out"                                                     },
    {"name" : "Dead ROCS",                               "resource" :"PixZeroOccROCs_run.txt"                                         }
  ]
}



///////////////////////////////// THIS IS THE COMPLETE DATASET INFORMATION AS OF 16.JUNE 2017 ////////////////////////////////

// var mapDescriptions =
// {
//   "BAD MODULES":
//   [
//     {"name" : "Quality tests",                     "resource" : "QTestAlarm.png",     "emptyMap" : "img/tkMapEmpty.png"},
//     {"name" : "Quality tests - FED view",          "resource" : "QTestAlarm_fed.png", "emptyMap" : "img/fedMapEmpty.png"},
//     {"name" : "Quality tests - Interactive",       "resource" : "fedmap.html"},
//     {"name" : "Quality tests - PSU view",          "resource" : "QTestAlarm_psu.png", "emptyMap" : "img/psuMapEmpty.png"},
//     {"name" : "Quality tests - PSU Interactive",   "resource" : "psumap.html"}
//   ],

//   "LIST":
//   [
//     {"name" : "BAD modules from quality tests",                        "resource" : "QualityTest_run.txt"},
//     {"name" : "BAD modules from quality tests - obsolete version",     "resource" : "QualityTestOBSOLETE_run.txt"},
//     {"name" : "Modules with the highest values",                       "resource" : "TopModulesList.log"},
//     {"name" : "Components found by the prompt calibration loop",       "resource" : "PCLBadComponents.log"}
//   ],

//   "NUMBER OF":
//   [
//     {"name" : "Digis per module",                                    "resource" : "NumberOfDigi.png",                         "emptyMap" : "img/tkMapEmpty.png"},
//     {"name" : "Clusters per module",                                 "resource" : "NumberOfCluster.png",                      "emptyMap" : "img/tkMapEmpty.png"},
//     {"name" : "APV shots per module",                                "resource" : "NApvShots.png",                            "emptyMap" : "img/tkMapEmpty.png"},
//     {"name" : "Clusters on-track per module",                        "resource" : "NumberOfOnTrackCluster.png",               "emptyMap" : "img/tkMapEmpty.png"},
//     {"name" : "Clusters off-track per module",                       "resource" : "NumberOfOfffTrackCluster.png",             "emptyMap" : "img/tkMapEmpty.png"},
//     {"name" : "Clusters off-track per module - Automatic scale",     "resource" : "NumberOfOfffTrackCluster_autoscale.png",   "emptyMap" : "img/tkMapEmpty.png"},
//     {"name" : "Inactive hits per module",                            "resource" : "NumberInactiveHits.png",                   "emptyMap" : "img/tkMapEmpty.png"},
//     {"name" : "Missing hits per module",                             "resource" : "NumberMissingHits.png",                    "emptyMap" : "img/tkMapEmpty.png"},
//     {"name" : "Valid hits per module",                               "resource" : "NumberValidHits.png",                      "emptyMap" : "img/tkMapEmpty.png"}
//   ],

//   "MISC":
//   [
//     {"name" : "Mean value for S/N for on-track cluster corrected for the angle",            "resource" :"StoNCorrOnTrack.png",          "emptyMap" : "img/tkMapEmpty.png"},
//     {"name" : "Mean value for Cluster Charge per cm from Track",                            "resource" :"ChargePerCMfromTrack.png",     "emptyMap" : "img/tkMapEmpty.png"},
//     {"name" : "Merged Bad components (PCL + FED Err + Cabling)",                            "resource" :"MergedBadComponentsTkMap.png", "emptyMap" : "img/tkMapEmpty.png"},
//     {"name" : "Merged Bad components (PCL + FED Err + Cabling) - Log",                      "resource" :"MergedBadComponents_run.txt",  "emptyMap" : "img/tkMapEmpty.png"},
//     {"name" : "FED errors per modules",                                                     "resource" :"FractionOfBadChannels.png",    "emptyMap" : "img/tkMapEmpty.png"},
//     {"name" : "Fraction of bad components per module found by the prompt calibration loop", "resource" :"PCLBadComponents.png",         "emptyMap" : "img/tkMapEmpty.png"},
//     {"name" : "Type of bad components per module found by the prompt calibration loop",     "resource" :"PCLBadComponents_Run_.png",    "emptyMap" : "img/tkMapEmpty.png"}
//   ],

//   "PIXEL":
//   [
//     {"name" : "Tcharge",                    "resource" :"Tcharge.png",                  "emptyMap" : "img/pxMapEmpty.png"},
//     {"name" : "Thitefficiency",             "resource" :"Thitefficiency.png",           "emptyMap" : "img/pxMapEmpty.png"},
//     {"name" : "Tmissing",                   "resource" :"Tmissing.png",                 "emptyMap" : "img/pxMapEmpty.png"},
//     {"name" : "Tnum_clusters_ontrack",      "resource" :"Tnum_clusters_ontrack.png",    "emptyMap" : "img/pxMapEmpty.png"},
//     {"name" : "Tresidual_x",                "resource" :"Tresidual_x.png",              "emptyMap" : "img/pxMapEmpty.png"},
//     {"name" : "Tresidual_y",                "resource" :"Tresidual_y.png",              "emptyMap" : "img/pxMapEmpty.png"},
//     {"name" : "Tsize",                      "resource" :"Tsize.png",                    "emptyMap" : "img/pxMapEmpty.png"},
//     {"name" : "Tvalid",                     "resource" :"Tvalid.png",                   "emptyMap" : "img/pxMapEmpty.png"},
//     {"name" : "adc",                        "resource" :"adc.png",                      "emptyMap" : "img/pxMapEmpty.png"},
//     {"name" : "num_clusters",               "resource" :"num_clusters.png",             "emptyMap" : "img/pxMapEmpty.png"},
//     {"name" : "num_digis",                  "resource" :"num_digis.png",                "emptyMap" : "img/pxMapEmpty.png"},
//     {"name" : "size",                       "resource" :"size.png",                     "emptyMap" : "img/pxMapEmpty.png"},
//     {"name" : "charge",                     "resource" :"charge.png",                   "emptyMap" : "img/pxMapEmpty.png"},
//     {"name" : "Trechitsize_x",              "resource" :"Trechitsize_x.png",            "emptyMap" : "img/pxMapEmpty.png"},
//     {"name" : "Trechitsize_y",              "resource" :"Trechitsize_y.png",            "emptyMap" : "img/pxMapEmpty.png"},
//     {"name" : "minmax",                     "resource" :"minmax.out"                                               },
//     {"name" : "PixZeroOccROCs",             "resource" :"PixZeroOccROCs_run.txt"                                    }
//   ]
// }
