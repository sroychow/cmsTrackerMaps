var baseURL = "http://vocms061.cern.ch/event_display/";

var mapDescriptions = [
    // ["Compare with the reference"],

    ["BAD MODULES",
        ["Quality tests", 
        "Quality tests - FED view",
        "Quality tests - Interactive",
        "Quality tests - PSU view"]
    ],

    ["LIST",
        ["BAD modules from quality tests",
        "BAD modules from quality tests - obsolete version",
        "Modules with the highest values",
        "Components found by the prompt calibration loop"]
   ],

    ["NUMBER OF", 
        ["Digis per module",
        "Clusters per module",
        "APV shots per module",
        "Clusters on-track per module",
        "Clusters off-track per module",
        "Clusters off-track per module - Automatic scale",
        "Inactive hits per module",
        "Missing hits per module",
        "Valid hits per module"]
    ],

    ["MISC", 
        ["Mean value for S/N for on-track cluster corrected for the angle",
        "Mean value for Cluster Charge per cm from Track",
        "Merged Bad components (PCL + FED Err + Cabling)",
        "Merged Bad components (PCL + FED Err + Cabling) - Log",
        "FED errors per modules",
        "Fraction of bad components per module found by the prompt calibration loop",
        "Type of bad components per module found by the prompt calibration loop"]
    ]
];