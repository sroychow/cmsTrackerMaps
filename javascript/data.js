// The grouping is more or less arbitrary and should be changed if more PIXEL related
// resources are added.

//name:       label string to be displayed in the checkboxList
//resource:   filename that should be loaded. Sometimes incomplete since it contains
//            the run number and needs to be assembled ad-hoc.
//emptyMap:   for png images the empty detector template ( see 'img/')

var mapDescriptions =
{
    "Strip": {
      "Bad Modules":
      [
        {"name" : "Quality tests",                     "resource" : "QTestAlarm.png",     "emptyMap" : "img/tkMapEmpty.png"},
        {"name" : "Quality tests - FED view",          "resource" : "QTestAlarm_fed.png", "emptyMap" : "img/fedMapEmpty.png"},
        {"name" : "Quality tests - PSU view",          "resource" : "QTestAlarm_psu.png", "emptyMap" : "img/psuMapEmpty.png"}
      ],

      "List":
      [
        {"name" : "Bad modules from quality tests",                        "resource" : "QualityTest_run.txt"},
        {"name" : "Modules with the highest values",                       "resource" : "TopModulesList.log"},
        {"name" : "Components found by the prompt calibration loop",       "resource" : "PCLBadComponents.log"}
      ],

      "Module Stats":
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

      "Misc":
      [
        {"name" : "Mean value for S/N for on-track cluster corrected for the angle",            "resource" :"StoNCorrOnTrack.png",          "emptyMap" : "img/tkMapEmpty.png"},
        {"name" : "Mean value for Cluster Charge per cm from Track",                            "resource" :"ChargePerCMfromTrack.png",     "emptyMap" : "img/tkMapEmpty.png"},
        {"name" : "Merged Bad components (PCL + FED Err + Cabling)",                            "resource" :"MergedBadComponentsTkMap.png", "emptyMap" : "img/tkMapEmpty.png"},
        {"name" : "Merged Bad components (PCL + FED Err + Cabling) - Log",                      "resource" :"MergedBadComponents_run.txt",  "emptyMap" : "img/tkMapEmpty.png"},
        {"name" : "FED errors per modules",                                                     "resource" :"FractionOfBadChannels.png",    "emptyMap" : "img/tkMapEmpty.png"},
        {"name" : "Fraction of bad components per module found by the prompt calibration loop", "resource" :"PCLBadComponents.png",         "emptyMap" : "img/tkMapEmpty.png"},
        {"name" : "Type of bad components per module found by the prompt calibration loop",     "resource" :"PCLBadComponents_Run_.png",    "emptyMap" : "img/tkMapEmpty.png"}
      ]
    },
    
  "Pixel": {
      "Misc":
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
        {"name" : "Inclusive Cluster Charge",                "resource" :"charge.png",                   "emptyMap" : "img/pxMapEmpty.png"},
        {"name" : "Cluster On Track Size X",                 "resource" :"Trechitsize_x.png",            "emptyMap" : "img/pxMapEmpty.png"},
        {"name" : "Cluster On Track Size Y",                 "resource" :"Trechitsize_y.png",            "emptyMap" : "img/pxMapEmpty.png"}
      ],

      "Logs":
      [
        {"name" : "Min and Max Value",                       "resource" :"minmax.out"                                                     },
        {"name" : "Dead ROCS",                               "resource" :"PixZeroOccROCs_run.txt"                                         }
      ]
  }
}
