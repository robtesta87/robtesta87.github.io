/*
Roberto Testa
Matricola Number:465341
Computational Graphics
Object: Jean Prouvè's EM Table Vitra
*/

//domain
var domain = DOMAIN([[0,2*PI]])([36]);
var domain2 = PROD1x1([INTERVALS(2*PI)(50), INTERVALS(1)(50)])
var domain1D = INTERVALS(1)(20);
var domain_surface_hermite = PROD1x1([INTERVALS(1)(14),INTERVALS(1)(14)]);

//COLORS
var BROWN = [78/255, 42/255, 28/255];
var YELLOW = [224/255, 208/255, 175/255];

//++++++support function+++++++++++

//horizontal circle
var horizontalCircle = function (r,h,dx,dy) {
  return function (v) {
    return [r*SIN(v[0])+dx, r*COS(v[0])+dy,h];
  };
};

//Vertical circle
var VerticalCircle = function (r,h,dx,dy) {
  return function (v) {
    return [h,r*SIN(v[0])+dx, r*COS(v[0])+dy];
  };
};

//how to make the Bezier Surface
function MakeBezierSurface(curve){
  var result = null;
  for (var i = 0; i < curve.length; i++) {
      var mappingFunc = BEZIER(S1)(curve[i]);
      var surface = MAP(mappingFunc)(domain2);
      if(result === null)
        result = surface;
      else
        result = STRUCT([result,surface]);
    };
  return result;
}

var getPanel = function(){
  //top Panel
  var panel1 = SIMPLEX_GRID([[20],[9],[-7.1,+0.1]]);
  //left panel
  var LeftPanel = SIMPLEX_GRID([[0.2],[9],[-6.7,+0.5]])
  //Right panel
  var RightPanel = SIMPLEX_GRID([[-19.8,+0.2],[9],[-6.7,+0.5]])
  //First Panel
  var FirstPanel = SIMPLEX_GRID([[20],[0.2],[-6.7,+0.5]])
  //Second Panel
  var SeconPanel = SIMPLEX_GRID([[20],[-8.8,+0.2],[-6.7,+0.5]])

  var Panel = STRUCT([COLOR(YELLOW)(panel1),COLOR(YELLOW)(LeftPanel),COLOR(YELLOW)(RightPanel),
                      COLOR(YELLOW)(FirstPanel),COLOR(YELLOW)(SeconPanel)]);
  return Panel;
}

var getLeg = function(){
  
  //part1
  var controlpointsLeg1 = [[3.5,0.2,5],[0,0.2,0],[-9.3,0,-15],[-3,0,0]];
  var curveMappingLeg1 = CUBIC_HERMITE(S0)(controlpointsLeg1);
  var curveLeg1 = MAP(curveMappingLeg1)(domain1D);
  //DRAW(curveLeg1)

  var controlpointsLeg2 = [[3.5,0.2,5],[2.4,0.2,6.7],[-2.1,0,1.7*3],[-2,0,0]];
  var curveMappingLeg2 = CUBIC_HERMITE(S0)(controlpointsLeg2);
  var curveLeg2 = MAP(curveMappingLeg2)(domain1D);
  //DRAW(curveLeg2)

  var controlpointsLeg3 = [[2.8-0.4,0.2,6.7],[0,0.2,0]];
  var curveMappingLeg3 = BEZIER(S0)(controlpointsLeg3);
  var LineLeg3 = MAP(curveMappingLeg3)(domain1D);
  //DRAW(LineLeg3)

  //part2
   var traslation = 0.5;
  var controlpointsLeg12 = [[3.5+traslation,0,5],[0,0,0],[-9.3,0,-15],[-3,0,0]];
  var curveMappingLeg12 = CUBIC_HERMITE(S0)(controlpointsLeg12);
  var curveLeg12 = MAP(curveMappingLeg12)(domain1D);
  //DRAW(curveLeg12)

  var controlpointsLeg22 = [[3.5+traslation,0,5],[2.4,0,6.7],[-2.4,0,5.4],[-2,0,0]];
  var curveMappingLeg22 = CUBIC_HERMITE(S0)(controlpointsLeg22);
  var curveLeg22 = MAP(curveMappingLeg22)(domain1D);
  //DRAW(curveLeg22)

  var controlpointsLeg32 = [[2.8-0.4,0,6.7],[0,0,0]];
  var curveMappingLeg32 = BEZIER(S0)(controlpointsLeg32);
  var LineLeg32 = MAP(curveMappingLeg32)(domain1D);
  //DRAW(LineLeg32)

  //part3
  var controlpointsLeg13 = [[3.5,-0.2,5],[0,-0.2,0],[-9.3,0,-15],[-3,0,0]];
  var curveMappingLeg13 = CUBIC_HERMITE(S0)(controlpointsLeg13);
  var curveLeg13 = MAP(curveMappingLeg13)(domain1D);
  //DRAW(curveLeg13)

  var controlpointsLeg23 = [[3.5,-0.2,5],[2.4,-0.2,6.7],[-2.1,0,1.7*3],[-2,0,0]];
  var curveMappingLeg23 = CUBIC_HERMITE(S0)(controlpointsLeg23);
  var curveLeg23 = MAP(curveMappingLeg23)(domain1D);
  //DRAW(curveLeg23)

  var controlpointsLeg33 = [[2.8-0.4,-0.2,6.7],[0,-0.2,0]];
  var curveMappingLeg33 = BEZIER(S0)(controlpointsLeg33);
  var LineLeg33 = MAP(curveMappingLeg33)(domain1D);
  //DRAW(LineLeg33)

  var surfaceLeg1= MAP(BEZIER(S1)([curveMappingLeg1,curveMappingLeg12,curveMappingLeg13]))(domain_surface_hermite)

  var surfaceLeg11= MAP(BEZIER(S1)([curveMappingLeg3,curveMappingLeg33]))(domain_surface_hermite)

  var surfaceLeg13= MAP(BEZIER(S1)([curveMappingLeg2,curveMappingLeg22,curveMappingLeg23]))(domain_surface_hermite)

  var surfaceLeg14= MAP(BEZIER(S1)([curveMappingLeg1,curveMappingLeg3]))(domain_surface_hermite)

  var surfaceLeg15= MAP(BEZIER(S1)([curveMappingLeg2,curveMappingLeg3]))(domain_surface_hermite)

  var surfaceLeg16= MAP(BEZIER(S1)([curveMappingLeg13,curveMappingLeg33]))(domain_surface_hermite)

  var surfaceLeg17= MAP(BEZIER(S1)([curveMappingLeg23,curveMappingLeg33]))(domain_surface_hermite)

  var CompleteLeg = STRUCT([COLOR(BROWN)(surfaceLeg1),COLOR(BROWN)(surfaceLeg11),
                            COLOR(BROWN)(surfaceLeg13),COLOR(BROWN)(surfaceLeg14),
                            COLOR(BROWN)(surfaceLeg15),COLOR(BROWN)(surfaceLeg16),
                            COLOR(BROWN)(surfaceLeg17)]);
  return CompleteLeg;
}

var getDownPanel = function(){
  var DownPanel1 = SIMPLEX_GRID([[-2.3,-2.3,+0.8],[-0.2,+2.5,-0.8,+5.3],[-6.7,+0.4]]);
  var DownPanel2 = SIMPLEX_GRID([[-2.3,-2.3,-10,+0.8],[-0.2,+2.5,-0.8,+5.3],[-6.7,+0.4]]);
  var DownPanel3 = SIMPLEX_GRID([[-0.2,+19.6],[-0.2,-2.5,+0.8],[-6.7,+0.4]]);
  var DownPanel4 = SIMPLEX_GRID([[-0.2,+19.6],[-0.2,-2.5,-2.7,+0.8],[-6.7,+0.4]]);

  var DownPanel = STRUCT([COLOR(BROWN)(DownPanel1),COLOR(BROWN)(DownPanel2),COLOR(BROWN)(DownPanel3),COLOR(BROWN)(DownPanel4)]);
  return DownPanel
}

var getTube = function(){
  var mappingCircleLeg11=VerticalCircle(0.15,0,0.15,0.15);
  var mappingCircleLeg12=VerticalCircle(0.15,7.3,0.15,0.15);
  
  var Tube1= T([0,1,2])([3.5+2.8,4.5-0.15,5-0.15])(MAP(BEZIER(S1)([mappingCircleLeg11,mappingCircleLeg12]))(domain2));
  
  var mappingCircleLeg13=VerticalCircle(0.15,0,0.15,0.15);
  var mappingCircleLeg14=VerticalCircle(0.15,2.9,0.15,0.15);
  
  var Tube2= T([0,1,2])([4.5,2.4,5-0.15])(R([0,1])([PI/4])(MakeBezierSurface([[mappingCircleLeg13,mappingCircleLeg14],[mappingCircleLeg13,[0.001,0.07,0.07]]])));
  
  var mappingCircleLeg15=VerticalCircle(0.15,0,0.15,0.15);
  var mappingCircleLeg16=VerticalCircle(0.15,3,0.15,0.15);
  
  var Tube3= T([0,1,2])([4.2,2.4+4.1,5-0.15])(R([0,1])([-PI/4])( MakeBezierSurface([[mappingCircleLeg15,mappingCircleLeg16],[mappingCircleLeg15,[0.001,0.07,0.07]]])));

  var Tube4 = T([0,1,2])([3.5+2.5+7.4,4.5,5-0.15])(R([0,1])([-PI/4])(MakeBezierSurface([[mappingCircleLeg15,mappingCircleLeg16],[mappingCircleLeg16,[3.001,0.07,0.07]]])));

  var Tube5 = T([0,1,2])([4.2+9.4,4.3,5-0.15])(R([0,1])([PI/4])(MakeBezierSurface([[mappingCircleLeg15,mappingCircleLeg16],[mappingCircleLeg16,[3.001,0.07,0.07]]])));
  
  var Tubes = STRUCT([COLOR(BROWN)(Tube1),COLOR(BROWN)(Tube2),COLOR(BROWN)(Tube3),COLOR(BROWN)(Tube4),COLOR(BROWN)(Tube5)]);
  return Tubes;
}

var getBolts = function(){
  var mappingCircleBolt1=VerticalCircle(0.1,0,0.1,0.1);
  var mappingCircleBolt12=VerticalCircle(0.09,-0.05,0.1,0.1);
  var mappingCircleBolt13=VerticalCircle(0.07,-0.07,0.1,0.1);
  var mappingCircleBolt14=VerticalCircle(0.04,-0.09,0.1,0.1);
  var mappingCircleBolt15=VerticalCircle(0.01,-0.1,0.1,0.1);
  
  //left Side
  var Bolt1 = T([1,2])([2.8,6.7+0.15])(MAP(BEZIER(S1)([mappingCircleBolt1,mappingCircleBolt12,mappingCircleBolt13,mappingCircleBolt14,mappingCircleBolt15,[-0.1001,0.1,0.1]]))(domain2))
  var Bolt2 = T([1,2])([2.8+0.4,6.7+0.15])(MAP(BEZIER(S1)([mappingCircleBolt1,mappingCircleBolt12,mappingCircleBolt13,mappingCircleBolt14,mappingCircleBolt15,[-0.1001,0.1,0.1]]))(domain2))
  var Bolt3 = T([1,2])([2.8+2.7,6.7+0.15])(MAP(BEZIER(S1)([mappingCircleBolt1,mappingCircleBolt12,mappingCircleBolt13,mappingCircleBolt14,mappingCircleBolt15,[-0.1001,0.1,0.1]]))(domain2))
  var Bolt4 = T([1,2])([2.8+2.7+0.4,6.7+0.15])(MAP(BEZIER(S1)([mappingCircleBolt1,mappingCircleBolt12,mappingCircleBolt13,mappingCircleBolt14,mappingCircleBolt15,[-0.1001,0.1,0.1]]))(domain2))
  
  //right Side
  var Bolt5 = T([0,1,2])([20,0.2+2.8,6.7+0.15])(R([0,1])([PI])(MAP(BEZIER(S1)([mappingCircleBolt1,mappingCircleBolt12,mappingCircleBolt13,mappingCircleBolt14,mappingCircleBolt15,[-0.1001,0.1,0.1]]))(domain2)))
  var Bolt6 = T([0,1,2])([20,0.2+2.8+0.4,6.7+0.15])(R([0,1])([PI])(MAP(BEZIER(S1)([mappingCircleBolt1,mappingCircleBolt12,mappingCircleBolt13,mappingCircleBolt14,mappingCircleBolt15,[-0.1001,0.1,0.1]]))(domain2)))
  var Bolt7 = T([0,1,2])([20,0.2+2.8+2.7,6.7+0.15])(R([0,1])([PI])(MAP(BEZIER(S1)([mappingCircleBolt1,mappingCircleBolt12,mappingCircleBolt13,mappingCircleBolt14,mappingCircleBolt15,[-0.1001,0.1,0.1]]))(domain2)))
  var Bolt8 = T([0,1,2])([20,0.2+2.8+2.7+0.4,6.7+0.15])(R([0,1])([PI])(MAP(BEZIER(S1)([mappingCircleBolt1,mappingCircleBolt12,mappingCircleBolt13,mappingCircleBolt14,mappingCircleBolt15,[-0.1001,0.1,0.1]]))(domain2)))

  //Front Side
  var Bolt9 = T([0,1,2])([0.2+4.7,0,6.7+0.15])(R([0,1])([PI/2])(MAP(BEZIER(S1)([mappingCircleBolt1,mappingCircleBolt12,mappingCircleBolt13,mappingCircleBolt14,mappingCircleBolt15,[-0.1001,0.1,0.1]]))(domain2)))
  var Bolt10 =T([0,1,2])([0.2+4.7+0.4,0,6.7+0.15])(R([0,1])([PI/2])(MAP(BEZIER(S1)([mappingCircleBolt1,mappingCircleBolt12,mappingCircleBolt13,mappingCircleBolt14,mappingCircleBolt15,[-0.1001,0.1,0.1]]))(domain2)))
  var Bolt11 =T([0,1,2])([0.2+4.7+10,0,6.7+0.15])(R([0,1])([PI/2])(MAP(BEZIER(S1)([mappingCircleBolt1,mappingCircleBolt12,mappingCircleBolt13,mappingCircleBolt14,mappingCircleBolt15,[-0.1001,0.1,0.1]]))(domain2)))
  var Bolt12 =T([0,1,2])([0.2+4.7+0.4+10,0,6.7+0.15])(R([0,1])([PI/2])(MAP(BEZIER(S1)([mappingCircleBolt1,mappingCircleBolt12,mappingCircleBolt13,mappingCircleBolt14,mappingCircleBolt15,[-0.1001,0.1,0.1]]))(domain2)))

  //Back Side
  var Bolt13 = T([0,1,2])([4.7,9,6.7+0.15])(R([0,1])([PI/2+PI])(MAP(BEZIER(S1)([mappingCircleBolt1,mappingCircleBolt12,mappingCircleBolt13,mappingCircleBolt14,mappingCircleBolt15,[-0.1001,0.1,0.1]]))(domain2)))
  var Bolt14 =T([0,1,2])([4.7+0.4,9,6.7+0.15])(R([0,1])([PI/2+PI])(MAP(BEZIER(S1)([mappingCircleBolt1,mappingCircleBolt12,mappingCircleBolt13,mappingCircleBolt14,mappingCircleBolt15,[-0.1001,0.1,0.1]]))(domain2)))
  var Bolt15 =T([0,1,2])([4.7+10,9,6.7+0.15])(R([0,1])([PI/2+PI])(MAP(BEZIER(S1)([mappingCircleBolt1,mappingCircleBolt12,mappingCircleBolt13,mappingCircleBolt14,mappingCircleBolt15,[-0.1001,0.1,0.1]]))(domain2)))
  var Bolt16 =T([0,1,2])([4.7+0.4+10,9,6.7+0.15])(R([0,1])([PI/2+PI])(MAP(BEZIER(S1)([mappingCircleBolt1,mappingCircleBolt12,mappingCircleBolt13,mappingCircleBolt14,mappingCircleBolt15,[-0.1001,0.1,0.1]]))(domain2)))

  var Bolts = STRUCT([Bolt1,Bolt2,Bolt3,Bolt4,Bolt5,Bolt6,Bolt7,Bolt8,Bolt9,Bolt10,Bolt11,Bolt12,Bolt13,Bolt14,Bolt15,Bolt16]);
  return Bolts;
}

var getSolders = function(){
  var controlpointsSolder = [[0,0,0],[0.18,0,-0.5],[0.22,0,-0.5],[0.4,0,0]];
  var curveMapping = BEZIER(S0)(controlpointsSolder);
  var curve = MAP(curveMapping)(domain1D);
  
  var controlpointsSolder2 = [[0,-0.1,0],[0.18,-0.1,-0.5],[0.22,-0.1,-0.5],[0.4,-0.1,0]];
  var curveMapping2 = BEZIER(S0)(controlpointsSolder2);
  var curve2 = MAP(curveMapping2)(domain1D);
  
  var controlpointsSolder3 = [[0,0,-0.1],[0.18,-0.5,-0.1],[0.22,-0.5,-0.1],[0.4,0,-0.1]];
  var curveMapping3 = BEZIER(S0)(controlpointsSolder3);
  var curve3 = MAP(curveMapping3)(domain1D);
  
  var controlpointsSolder4 = [[0,0,0],[0.18,-0.5,0],[0.22,-0.5,0],[0.4,0,0]];
  var curveMapping4 = BEZIER(S0)(controlpointsSolder4);
  var curve4 = MAP(curveMapping4)(domain1D);

  var Solder1 = MAP(BEZIER(S1)([curveMapping,curveMapping2,[0.1,-0.1,0]]))(domain_surface_hermite)
  var Solder2 = MAP(BEZIER(S1)([curveMapping4,curveMapping3,[0.1,0.1,0]]))(domain_surface_hermite)
  var CompleteSolder = STRUCT([Solder1,Solder2])
  var CompleteSolder1 = T([0,1,2])([3.175+1.8,1.275+1.5,6.7])(R([0,1])([PI/4])(CompleteSolder))
  var CompleteSolder2 = T([0,1,2])([10,2.8,0])(CompleteSolder1)
  var CompleteSolder3 = T([0,1,2])([3.175+1.8,1.275+1.5+0.6,6.7])(R([0,1])([PI/4+PI])(CompleteSolder))
  var CompleteSolder4 = T([0,1,2])([10,2.8,0])(CompleteSolder3)
  var CompleteSolder5 = T([0,1,2])([3.175+1.6,1.275+1.5+3.1,6.7])(R([0,1])([-PI/4])(CompleteSolder))
  var CompleteSolder6 = T([0,1,2])([10,-2.8,0])(CompleteSolder5)
  var CompleteSolder7 = T([0,1,2])([3.175+2.1,1.275+1.5+3.1,6.7])(R([0,1])([-PI/4-PI])(CompleteSolder))
  var CompleteSolder8 = T([0,1,2])([10,-2.8,0])(CompleteSolder7)

  var Solders = STRUCT([COLOR(BROWN)(CompleteSolder1),COLOR(BROWN)(CompleteSolder2),COLOR(BROWN)(CompleteSolder3),
                        COLOR(BROWN)(CompleteSolder4),COLOR(BROWN)(CompleteSolder5),COLOR(BROWN)(CompleteSolder6),
                        COLOR(BROWN)(CompleteSolder7),COLOR(BROWN)(CompleteSolder8)]);
  return Solders;
}
var Panel = getPanel();
var CompleteLeg = T([0,1])([3.175,1.275])(R([0,1])([PI/4])(getLeg()));
var CompleteLeg2 = T([0,1])([3.175,9-1.275])(R([0,1])([-PI/4])(getLeg()));
var CompleteLeg3 = T([0,1])([20-3.175,9-1.275])(R([0,1])([PI+PI/4])(getLeg()));
var CompleteLeg4 = T([0,1])([20-3.175,1.275])(R([0,1])([PI-PI/4])(getLeg()));
var DownPanel = getDownPanel();
var Bolts = getBolts();
var Tubes = getTube();
var Solders = getSolders();

var getEMTable =function(){
  var EMtable =STRUCT([Panel,CompleteLeg,CompleteLeg2,CompleteLeg3,CompleteLeg4,DownPanel,Tubes,Bolts,Solders])
  return EMtable;
}

var EMtable = getEMTable();
DRAW(EMtable);