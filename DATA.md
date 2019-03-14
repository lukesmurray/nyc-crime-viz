## Source

I am using NYPD Complaint Data Historic which can be found [here](https://data.cityofnewyork.us/Public-Safety/NYPD-Complaint-Data-Historic/qgea-i56i)


### Headers

1   CMPLNT_NUM
2   CMPLNT_FR_DT
3   CMPLNT_FR_TM
4   CMPLNT_TO_DT
5   CMPLNT_TO_TM
6   ADDR_PCT_CD
7   RPT_DT
8   KY_CD
9   OFNS_DESC
10  PD_CD
11  PD_DESC
12  CRM_ATPT_CPTD_CD
13  LAW_CAT_CD
14  BORO_NM
15  LOC_OF_OCCUR_DESC
16  PREM_TYP_DESC
17  JURIS_DESC
18  JURISDICTION_CODE
19  PARKS_NM
20  HADEVELOPT
21  HOUSING_PSA
22  X_COORD_CD
23  Y_COORD_CD
24  SUSP_AGE_GROUP
25  SUSP_RACE
26  SUSP_SEX
27  TRANSIT_DISTRICT
28  Latitude
29  Longitude
30  Lat_Lon
31  PATROL_BORO
32  STATION_NAME
33  VIC_AGE_GROUP
34  VIC_RACE
35  VIC_SEX


field              type     sum                 min                                                max                            min_length  max_length  mean                stddev
CMPLNT_NUM         Integer  3320276471697244    100000228                                          999999904                      9           9           550005586.0173157   259784717.80620375
CMPLNT_FR_DT       Unicode                      01/01/1948                                         12/31/2017                     0           10                              
CMPLNT_FR_TM       Unicode                      00:00:00                                           23:59:00                       0           8                               
CMPLNT_TO_DT       Unicode                      01/01/1978                                         12/31/2017                     0           10                              
CMPLNT_TO_TM       Unicode                      00:00:00                                           24:00:00                       0           8                               
ADDR_PCT_CD        Integer  382540115           1                                                  123                            0           3           63.39068912455749   34.44966628689655
RPT_DT             Unicode                      01/01/2006                                         12/31/2017                     10          10                              
KY_CD              Integer  1777353306          101                                                881                            3           3           294.4195325176125   148.93558190689436
OFNS_DESC          Unicode                      ABORTION                                           VEHICLE AND TRAFFIC LAWS       0           36                              
PD_CD              Integer  2513075551          101                                                975                            0           3           416.65128397023307  218.12122616835842
PD_DESC            Unicode                      A.B.C.,FALSE PROOF OF AGE                          WOUNDS,REPORTING OF            0           60                              
CRM_ATPT_CPTD_CD   Unicode                      ATTEMPTED                                          COMPLETED                      0           9                               
LAW_CAT_CD         Unicode                      FELONY                                             VIOLATION                      6           11                              
BORO_NM            Unicode                      BRONX                                              STATEN ISLAND                  0           13                              
LOC_OF_OCCUR_DESC  Unicode                      FRONT OF                                           REAR OF                        0           11                              
PREM_TYP_DESC      Unicode                      ABANDONED BUILDING                                 VIDEO STORE                    0           28                              
JURIS_DESC         Unicode                      AMTRACK                                            U.S. PARK POLICE               5           35                              
JURISDICTION_CODE  Integer  4162018             0                                                  97                             0           2           0.6900350221931077  6.4350337340344455
PARKS_NM           Unicode                      """UNCLE"" VITO E. MARANZANO GLENDALE PLAYGROUND"  ZION TRIANGLE                  0           83                              
HADEVELOPT         Unicode                      1010 EAST 178TH STREET                             WYCKOFF GARDENS                0           43                              
HOUSING_PSA        Unicode                      10                                                 NA                             1           5                               
X_COORD_CD         Integer  6048224514427       111                                                1067298                        0           7           1004770.9088465074  21826.175265983125
Y_COORD_CD         Integer  1245827586337       111                                                7250292                        0           7           206965.0875565195   31746.546723890875
SUSP_AGE_GROUP     Unicode                      -1                                                 UNKNOWN                        0           7                               
SUSP_RACE          Unicode                      AMERICAN INDIAN/ALASKAN NATIVE                     WHITE HISPANIC                 0           30                              
SUSP_SEX           Unicode                      F                                                  U                              0           1                               
TRANSIT_DISTRICT   Integer  1808006             1                                                  34                             0           2           13.684367478542546  12.496960921666878
Latitude           Float    245202797.92926526  40.112709974                                       59.657273946                   0           12          40.734704464000835  0.08702935933904456
Longitude          Float    -444997540.6602493  -77.519206334                                      -73.684788384                  0           13          -73.92592359908498  0.07871270983134
Lat_Lon            Unicode                      (40.112709974, -77.519206334)                      (59.657273946, -73.872926184)  0           29                              
PATROL_BORO        Unicode                      PATROL BORO BKLYN NORTH                            PATROL BORO STATEN ISLAND      0           25                              
STATION_NAME       Unicode                      1 AVENUE                                           ZEREGA AVENUE                  0           30                              
VIC_AGE_GROUP      Unicode                      -1                                                 UNKNOWN                        0           7                               
VIC_RACE           Unicode                      AMERICAN INDIAN/ALASKAN NATIVE                     WHITE HISPANIC                 0           30                              
VIC_SEX            Unicode                      D                                                  U                              0           1                               


field              value                           count
CMPLNT_NUM         693627374                       1
CMPLNT_NUM         705762352                       1
CMPLNT_NUM         867544399                       1
CMPLNT_NUM         627019331                       1
CMPLNT_NUM         122691537                       1
CMPLNT_NUM         750965283                       1
CMPLNT_NUM         554199449                       1
CMPLNT_NUM         329322854                       1
CMPLNT_NUM         886660316                       1
CMPLNT_NUM         652351596                       1
CMPLNT_FR_DT       01/01/2010                      2397
CMPLNT_FR_DT       01/01/2008                      2308
CMPLNT_FR_DT       01/01/2011                      2305
CMPLNT_FR_DT       01/01/2014                      2286
CMPLNT_FR_DT       01/01/2007                      2269
CMPLNT_FR_DT       01/01/2016                      2244
CMPLNT_FR_DT       01/01/2006                      2137
CMPLNT_FR_DT       01/01/2013                      2098
CMPLNT_FR_DT       01/01/2012                      2076
CMPLNT_FR_DT       01/01/2009                      2064
CMPLNT_FR_TM       12:00:00                        161183
CMPLNT_FR_TM       15:00:00                        136792
CMPLNT_FR_TM       18:00:00                        131603
CMPLNT_FR_TM       20:00:00                        124921
CMPLNT_FR_TM       17:00:00                        122280
CMPLNT_FR_TM       16:00:00                        122082
CMPLNT_FR_TM       19:00:00                        117748
CMPLNT_FR_TM       14:00:00                        108662
CMPLNT_FR_TM       21:00:00                        107422
CMPLNT_FR_TM       22:00:00                        105955
CMPLNT_TO_DT       (NULL)                          1541805
CMPLNT_TO_DT       10/17/2014                      1369
CMPLNT_TO_DT       01/01/2014                      1364
CMPLNT_TO_DT       06/01/2016                      1344
CMPLNT_TO_DT       10/04/2013                      1325
CMPLNT_TO_DT       09/20/2014                      1312
CMPLNT_TO_DT       09/18/2015                      1301
CMPLNT_TO_DT       10/05/2012                      1301
CMPLNT_TO_DT       10/18/2014                      1296
CMPLNT_TO_DT       08/14/2013                      1296
CMPLNT_TO_TM       (NULL)                          1537755
CMPLNT_TO_TM       12:00:00                        79472
CMPLNT_TO_TM       15:00:00                        71922
CMPLNT_TO_TM       08:00:00                        70798
CMPLNT_TO_TM       09:00:00                        68371
CMPLNT_TO_TM       16:00:00                        65346
CMPLNT_TO_TM       17:00:00                        63342
CMPLNT_TO_TM       10:00:00                        61989
CMPLNT_TO_TM       18:00:00                        61698
CMPLNT_TO_TM       14:00:00                        57909
ADDR_PCT_CD        75                              195188
ADDR_PCT_CD        43                              160373
ADDR_PCT_CD        44                              150806
ADDR_PCT_CD        40                              143090
ADDR_PCT_CD        14                              139740
ADDR_PCT_CD        46                              128289
ADDR_PCT_CD        52                              126613
ADDR_PCT_CD        73                              124666
ADDR_PCT_CD        120                             124645
ADDR_PCT_CD        67                              114105
RPT_DT             05/29/2007                      1891
RPT_DT             11/01/2006                      1875
RPT_DT             10/23/2007                      1853
RPT_DT             06/05/2007                      1821
RPT_DT             07/29/2008                      1791
RPT_DT             07/05/2006                      1784
RPT_DT             05/27/2008                      1778
RPT_DT             07/31/2007                      1775
RPT_DT             06/21/2006                      1773
RPT_DT             09/27/2007                      1761
KY_CD              341                             986336
KY_CD              578                             736317
KY_CD              344                             624556
KY_CD              109                             516712
KY_CD              351                             510927
KY_CD              361                             327564
KY_CD              235                             319020
KY_CD              105                             227065
KY_CD              106                             224684
KY_CD              107                             216357
OFNS_DESC          PETIT LARCENY                   986327
OFNS_DESC          HARRASSMENT 2                   736247
OFNS_DESC          ASSAULT 3 & RELATED OFFENSES    624483
OFNS_DESC          CRIMINAL MISCHIEF & RELATED OF  603249
OFNS_DESC          GRAND LARCENY                   516703
OFNS_DESC          DANGEROUS DRUGS                 390201
OFNS_DESC          OFF. AGNST PUB ORD SENSBLTY &   327526
OFNS_DESC          ROBBERY                         227063
OFNS_DESC          FELONY ASSAULT                  224630
OFNS_DESC          BURGLARY                        216356
PD_CD              101                             521223
PD_CD              638                             461926
PD_CD              639                             322742
PD_CD              637                             274329
PD_CD              333                             270461
PD_CD              338                             260124
PD_CD              254                             217936
PD_CD              321                             202585
PD_CD              567                             192817
PD_CD              109                             185682
PD_DESC            ASSAULT 3                       521223
PD_DESC            HARASSMENT,SUBD 3,4,5           461926
PD_DESC            AGGRAVATED HARASSMENT 2         322742
PD_DESC            HARASSMENT,SUBD 1,CIVILIAN      274329
PD_DESC            LARCENY,PETIT FROM STORE-SHOPL  270461
PD_DESC            LARCENY,PETIT FROM BUILDING,UN  260124
PD_DESC            MISCHIEF, CRIMINAL 4, OF MOTOR  217936
PD_DESC            LARCENY,PETIT FROM AUTO         202585
PD_DESC            MARIJUANA, POSSESSION 4 & 5     192817
PD_DESC            ASSAULT 2,1,UNCLASSIFIED        185682
CRM_ATPT_CPTD_CD   COMPLETED                       5932953
CRM_ATPT_CPTD_CD   ATTEMPTED                       103845
CRM_ATPT_CPTD_CD   (NULL)                          7
LAW_CAT_CD         MISDEMEANOR                     3431733
LAW_CAT_CD         FELONY                          1855915
LAW_CAT_CD         VIOLATION                       749157
BORO_NM            BROOKLYN                        1798175
BORO_NM            MANHATTAN                       1443245
BORO_NM            BRONX                           1307343
BORO_NM            QUEENS                          1191688
BORO_NM            STATEN ISLAND                   286135
BORO_NM            (NULL)                          10219
LOC_OF_OCCUR_DESC  INSIDE                          3023004
LOC_OF_OCCUR_DESC  FRONT OF                        1402959
LOC_OF_OCCUR_DESC  (NULL)                          1310078
LOC_OF_OCCUR_DESC  OPPOSITE OF                     165379
LOC_OF_OCCUR_DESC  REAR OF                         132249
LOC_OF_OCCUR_DESC  OUTSIDE                         3136
PREM_TYP_DESC      STREET                          1973197
PREM_TYP_DESC      RESIDENCE - APT. HOUSE          1259252
PREM_TYP_DESC      RESIDENCE-HOUSE                 592197
PREM_TYP_DESC      RESIDENCE - PUBLIC HOUSING      456332
PREM_TYP_DESC      OTHER                           161934
PREM_TYP_DESC      COMMERCIAL BUILDING             156709
PREM_TYP_DESC      TRANSIT - NYC SUBWAY            129451
PREM_TYP_DESC      CHAIN STORE                     120932
PREM_TYP_DESC      DEPARTMENT STORE                116923
PREM_TYP_DESC      PUBLIC SCHOOL                   75874
JURIS_DESC         N.Y. POLICE DEPT                5363022
JURIS_DESC         N.Y. HOUSING POLICE             465254
JURIS_DESC         N.Y. TRANSIT POLICE             132465
JURIS_DESC         PORT AUTHORITY                  29354
JURIS_DESC         OTHER                           16899
JURIS_DESC         POLICE DEPT NYC                 8955
JURIS_DESC         DEPT OF CORRECTIONS             7813
JURIS_DESC         TRI-BORO BRDG TUNNL             5072
JURIS_DESC         HEALTH & HOSP CORP              3045
JURIS_DESC         N.Y. STATE POLICE               1488
JURISDICTION_CODE  0                               5358307
JURISDICTION_CODE  2                               464789
JURISDICTION_CODE  1                               132445
JURISDICTION_CODE  3                               29354
JURISDICTION_CODE  97                              16898
JURISDICTION_CODE  69                              8955
JURISDICTION_CODE  72                              7813
JURISDICTION_CODE  (NULL)                          5201
JURISDICTION_CODE  4                               5072
JURISDICTION_CODE  14                              3045
PARKS_NM           NA                              4118985
PARKS_NM           (NULL)                          1900870
PARKS_NM           CENTRAL PARK                    1062
PARKS_NM           FLUSHING MEADOWS CORONA PARK    813
PARKS_NM           CONEY ISLAND BEACH & BOARDWALK  596
PARKS_NM           RIVERSIDE PARK                  426
PARKS_NM           PROSPECT PARK                   292
PARKS_NM           MARCUS GARVEY PARK              270
PARKS_NM           MACOMBS DAM PARK                258
PARKS_NM           UNION SQUARE PARK               250
HADEVELOPT         (NULL)                          5735354
HADEVELOPT         CASTLE HILL                     6652
HADEVELOPT         VAN DYKE I                      5329
HADEVELOPT         MARCY                           4969
HADEVELOPT         BUTLER                          4669
HADEVELOPT         LINCOLN                         4629
HADEVELOPT         GRANT                           4450
HADEVELOPT         LINDEN                          4443
HADEVELOPT         PINK                            4331
HADEVELOPT         DOUGLASS                        4325
HOUSING_PSA        NA                              5567851
HOUSING_PSA        887                             6423
HOUSING_PSA        670                             6382
HOUSING_PSA        845                             6095
HOUSING_PSA        632                             5726
HOUSING_PSA        720                             5642
HOUSING_PSA        645                             5578
HOUSING_PSA        415                             5275
HOUSING_PSA        696                             5138
HOUSING_PSA        638                             5126
X_COORD_CD         987220                          19479
X_COORD_CD         (NULL)                          17299
X_COORD_CD         1046367                         15505
X_COORD_CD         1016268                         7690
X_COORD_CD         1006434                         6699
X_COORD_CD         981309                          6583
X_COORD_CD         1017542                         6273
X_COORD_CD         1019840                         5638
X_COORD_CD         986882                          5528
X_COORD_CD         1001575                         5255
Y_COORD_CD         212676                          19570
Y_COORD_CD         (NULL)                          17299
Y_COORD_CD         186986                          15720
Y_COORD_CD         227533                          7716
Y_COORD_CD         244344                          7133
Y_COORD_CD         197980                          6447
Y_COORD_CD         255919                          6213
Y_COORD_CD         206689                          5628
Y_COORD_CD         214802                          5558
Y_COORD_CD         210816                          5259
SUSP_AGE_GROUP     (NULL)                          4472282
SUSP_AGE_GROUP     25-44                           681843
SUSP_AGE_GROUP     18-24                           277584
SUSP_AGE_GROUP     UNKNOWN                         268074
SUSP_AGE_GROUP     45-64                           240263
SUSP_AGE_GROUP     <18                             77784
SUSP_AGE_GROUP     65+                             18845
SUSP_AGE_GROUP     2016                            8
SUSP_AGE_GROUP     2017                            8
SUSP_AGE_GROUP     -969                            4
SUSP_RACE          (NULL)                          3103741
SUSP_RACE          BLACK                           1093935
SUSP_RACE          UNKNOWN                         764617
SUSP_RACE          WHITE HISPANIC                  496597
SUSP_RACE          WHITE                           330730
SUSP_RACE          BLACK HISPANIC                  149002
SUSP_RACE          ASIAN / PACIFIC ISLANDER        89136
SUSP_RACE          AMERICAN INDIAN/ALASKAN NATIVE  9036
SUSP_RACE          OTHER                           11
SUSP_SEX           (NULL)                          3237055
SUSP_SEX           M                               1784627
SUSP_SEX           F                               576490
SUSP_SEX           U                               438633
TRANSIT_DISTRICT   (NULL)                          5904683
TRANSIT_DISTRICT   4                               23227
TRANSIT_DISTRICT   2                               15892
TRANSIT_DISTRICT   3                               12996
TRANSIT_DISTRICT   1                               12258
TRANSIT_DISTRICT   20                              11974
TRANSIT_DISTRICT   33                              11900
TRANSIT_DISTRICT   12                              9947
TRANSIT_DISTRICT   32                              8995
TRANSIT_DISTRICT   11                              8573
Latitude           40.750430768                    19410
Latitude           (NULL)                          17299
Latitude           40.679700408                    15505
Latitude           40.791151867                    7671
Latitude           40.837323511                    6698
Latitude           40.710093847                    6381
Latitude           40.869058532                    6213
Latitude           40.733926841                    5624
Latitude           40.756266207                    5463
Latitude           40.745252741                    5243
Longitude          -73.989282176                   19410
Longitude          (NULL)                          17299
Longitude          -73.776047368                   15505
Longitude          -73.884371919                   7671
Longitude          -73.919830757                   6698
Longitude          -74.01060963                    6381
Longitude          -73.879630148                   6213
Longitude          -73.871582398                   5624
Longitude          -73.990501248                   5463
Longitude          -73.87006287                    5243
Lat_Lon            (40.750430768, -73.989282176)   19410
Lat_Lon            (NULL)                          17299
Lat_Lon            (40.679700408, -73.776047368)   15505
Lat_Lon            (40.791151867, -73.884371919)   7671
Lat_Lon            (40.837323511, -73.919830757)   6698
Lat_Lon            (40.710093847, -74.01060963)    6381
Lat_Lon            (40.869058532, -73.879630148)   6213
Lat_Lon            (40.733926841, -73.871582398)   5624
Lat_Lon            (40.756266207, -73.990501248)   5463
Lat_Lon            (40.745252741, -73.87006287)    5243
PATROL_BORO        PATROL BORO BRONX               1308131
PATROL_BORO        PATROL BORO BKLYN SOUTH         903639
PATROL_BORO        PATROL BORO BKLYN NORTH         896030
PATROL_BORO        PATROL BORO MAN SOUTH           727535
PATROL_BORO        PATROL BORO MAN NORTH           715195
PATROL_BORO        PATROL BORO QUEENS NORTH        616064
PATROL_BORO        PATROL BORO QUEENS SOUTH        578293
PATROL_BORO        PATROL BORO STATEN ISLAND       286260
PATROL_BORO        (NULL)                          5658
STATION_NAME       (NULL)                          5904683
STATION_NAME       125 STREET                      6889
STATION_NAME       14 STREET                       3757
STATION_NAME       34 ST.-PENN STATION             3214
STATION_NAME       42 ST.-PORT AUTHORITY BUS TERM  3086
STATION_NAME       116 STREET                      2919
STATION_NAME       42 ST.-GRAND CENTRAL            2648
STATION_NAME       42 ST.-TIMES SQUARE             2498
STATION_NAME       CANAL STREET                    2084
STATION_NAME       59 ST.-COLUMBUS CIRCLE          1708
VIC_AGE_GROUP      25-44                           1949740
VIC_AGE_GROUP      (NULL)                          1638441
VIC_AGE_GROUP      45-64                           1010708
VIC_AGE_GROUP      18-24                           622503
VIC_AGE_GROUP      UNKNOWN                         327140
VIC_AGE_GROUP      <18                             286969
VIC_AGE_GROUP      65+                             200949
VIC_AGE_GROUP      929                             9
VIC_AGE_GROUP      946                             8
VIC_AGE_GROUP      937                             8
VIC_RACE           UNKNOWN                         2046115
VIC_RACE           BLACK                           1428171
VIC_RACE           WHITE                           1055261
VIC_RACE           WHITE HISPANIC                  956281
VIC_RACE           ASIAN / PACIFIC ISLANDER        327584
VIC_RACE           BLACK HISPANIC                  196230
VIC_RACE           AMERICAN INDIAN/ALASKAN NATIVE  26827
VIC_RACE           (NULL)                          305
VIC_RACE           OTHER                           31
VIC_SEX            F                               2354734
VIC_SEX            M                               1961519
VIC_SEX            E                               1012663
VIC_SEX            D                               707582
VIC_SEX            (NULL)                          304
VIC_SEX            U                               3
