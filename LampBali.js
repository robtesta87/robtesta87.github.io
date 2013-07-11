/*
Roberto Testa
Matricola Number:465341
Computational Graphics
Object: Bruno Munari's Lamp Bali
*/

//domain
var domain = DOMAIN([[0,2*PI]])([36]);
var domain2 = PROD1x1([INTERVALS(2*PI)(50), INTERVALS(1)(50)])
var domain1D = INTERVALS(1)(20);
var domain_surface_hermite = PROD1x1([INTERVALS(1)(14),INTERVALS(1)(14)]);
var domain_rotational = DOMAIN([[0,1],[0,2*PI]])([20,20]);

//COLORS
var BLACK = [25/255, 25/255, 25/255];
var LIGHTBROWN = [208/255,182/255,131/255]
var LIGHTWHITE = [2,2,2]
var WHITE = [1,1,1]
var TOWEL = [(215/255)+0.3,(193/255)+0.3,(180/255)+0.3]
var BROWN = [78/255, 42/255, 28/255];
var YELLOW = [224/255, 208/255, 175/255];

//++++++support function+++++++++++

//horizontal circle
var horizontalCircle = function (r,h,dx,dy) {
  return function (v) {
    return [r*SIN(v[0])+dx, r*COS(v[0])+dy,h];
  };
};

//horizontal circle
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

var getBase = function(){
  var Base1 = SIMPLEX_GRID([[2],[2],[0.1]]);
  var Base2 = SIMPLEX_GRID([[-0.1,-0.05,1.7],[0.1],[-0.1,1.8]]);
  var Base3 = SIMPLEX_GRID([[-0.1,-0.05,1.7],[-1.9,+0.1],[-0.1,1.8]])
  var Base4 = SIMPLEX_GRID([[0.1],[-0.1,-0.05,1.7],[-0.1,1.8]])
  var Base5 = SIMPLEX_GRID([[-1.9,0.1],[-0.1,-0.05,1.7],[-0.1,1.8]])
  var Base6 = SIMPLEX_GRID([[2],[2],[-1.9,0.1]]);

  var Base = STRUCT([COLOR(LIGHTBROWN)(Base1),COLOR(LIGHTBROWN)(Base2),COLOR(LIGHTBROWN)(Base3),
                      COLOR(LIGHTBROWN)(Base4),COLOR(LIGHTBROWN)(Base5),COLOR(LIGHTBROWN)(Base6)]);
  return Base;
}

var getBulb = function(){
  var mappingCircle1=horizontalCircle(0.2,2,0,0);
  var mappingCircle2=horizontalCircle(0.2,2.3,0,0);
  var mappingCircle3=horizontalCircle(0.3,2,0,0);
  var mappingCircle4=horizontalCircle(0.3,2.3,0,0);  
  var portalampadina= MakeBezierSurface([[mappingCircle1,mappingCircle2],[mappingCircle3,mappingCircle4],[mappingCircle4,mappingCircle2]]);


  var profile = BEZIER(S0)([[0.2,0,2.3],[0.2,0,2.6],[0.8,0,3],[0.8,0,3.3],[0,0,3.5]]);
  var mapping = ROTATIONAL_SURFACE(profile);
  var surface = MAP(mapping)(domain_rotational);

  var Bulb = STRUCT([COLOR(WHITE)(portalampadina),COLOR(LIGHTWHITE)(surface)]);
  return Bulb;
}

var getTube = function(){
  var traslation = 0.05;
  var controlpointsRTube1 = [[1,0,1.8],
                            [1.75,0,1.8],
                            [1.5,0,1.8],
                            [1.8,0,2.1]]
  var curveMappingRTube1 = BEZIER(S0)(controlpointsRTube1);
  var curveRTube = MAP(curveMappingRTube1)(domain1D);

  var controlpointsRTube2 = [[1,0,1.8+traslation],
                            [1.75-traslation,0,1.8+traslation],
                            [1.5-traslation,0,1.8+traslation],
                            [1.8-traslation,0,2.1+traslation]]
  var curveMappingRTube2 = BEZIER(S0)(controlpointsRTube2);
  var curveRTube2 = MAP(curveMappingRTube2)(domain1D);

  var controlpointsRTube3 = [[1.8,0,2.1],
                            [2,0,2.4],
                            [2,0,2.2],
                            [2,0,2.8]]
  var curveMappingRTube3 = BEZIER(S0)(controlpointsRTube3);
  var curveRTube3 = MAP(curveMappingRTube3)(domain1D);

  var controlpointsRTube4 =  [[1.8-traslation,0,2.1+traslation],
                            [2-traslation,0,2.4],
                            [2-traslation,0,2.2],
                            [2-traslation,0,2.8]]

  var curveMappingRTube4 = BEZIER(S0)(controlpointsRTube4);
  var curveRTube4 = MAP(curveMappingRTube4)(domain1D);

  var height_variation = 0.5
  var controlpointsRTube5 = [[2,0,2.8],[2,0,3.5+height_variation]]
  var curveMappingRTube5 = BEZIER(S0)(controlpointsRTube5);
  var curveRTube5 = MAP(curveMappingRTube5)(domain1D);

  var controlpointsRTube6 =  [[2-traslation,0,2.8],[2-traslation,0,3.5+height_variation]]
  var curveMappingRTube6 = BEZIER(S0)(controlpointsRTube6);
  var curveRTube6 = MAP(curveMappingRTube6)(domain1D);

  var controlpointsRTube7 = [[1,0,4.5+height_variation],[-1,0,4.5+height_variation]]
  var curveMappingRTube7 = BEZIER(S0)(controlpointsRTube7);
  var curveRTube7 = MAP(curveMappingRTube7)(domain1D);

  var controlpointsRTube8 =  [[1,0,4.5-traslation+height_variation],[-1,0,4.5-traslation+height_variation]]
  var curveMappingRTube8 = BEZIER(S0)(controlpointsRTube8);
  var curveRTube8 = MAP(curveMappingRTube8)(domain1D);

  var sup_hermiteRTube = CUBIC_HERMITE(S1)([curveMappingRTube1,curveMappingRTube2,[0,0.1,0],[0,-0.1,0]]);
  var SurfaceRTube = MAP(sup_hermiteRTube)(domain_surface_hermite);
  var sup_hermiteRTube2 = CUBIC_HERMITE(S1)([curveMappingRTube1,curveMappingRTube2,[0,-0.1,0],[0,0.1,0]]);
  var SurfaceRTube2 = MAP(sup_hermiteRTube2)(domain_surface_hermite);

  var sup_hermiteRTube3 = CUBIC_HERMITE(S1)([curveMappingRTube3,curveMappingRTube4,[0,0.1,0],[0,-0.1,0]]);
  var SurfaceRTube3 = MAP(sup_hermiteRTube3)(domain_surface_hermite);
  var sup_hermiteRTube4 = CUBIC_HERMITE(S1)([curveMappingRTube3,curveMappingRTube4,[0,-0.1,0],[0,0.1,0]]);
  var SurfaceRTube4 = MAP(sup_hermiteRTube4)(domain_surface_hermite);

  var sup_hermiteRTube5 = CUBIC_HERMITE(S1)([curveMappingRTube5,curveMappingRTube6,[0,0.1,0],[0,-0.1,0]]);
  var SurfaceRTube5 = MAP(sup_hermiteRTube5)(domain_surface_hermite);
  var sup_hermiteRTube6 = CUBIC_HERMITE(S1)([curveMappingRTube5,curveMappingRTube6,[0,-0.1,0],[0,0.1,0]]);
  var SurfaceRTube6 = MAP(sup_hermiteRTube6)(domain_surface_hermite);

  var sup_hermiteRTube7 = CUBIC_HERMITE(S1)([curveMappingRTube7,curveMappingRTube8,[0,0.1,0],[0,-0.1,0]]);
  var SurfaceRTube7 = MAP(sup_hermiteRTube7)(domain_surface_hermite);
  var sup_hermiteRTube8 = CUBIC_HERMITE(S1)([curveMappingRTube7,curveMappingRTube8,[0,-0.1,0],[0,0.1,0]]);
  var SurfaceRTube8 = MAP(sup_hermiteRTube8)(domain_surface_hermite);

  var curve = T([0,2])([-1,-1.8])(STRUCT([SurfaceRTube,SurfaceRTube2,SurfaceRTube3,SurfaceRTube4]));
  var curve2 = T([0,2])([2,3.5+height_variation])(R([0,2])([-PI/2])(curve))
  //Right Side
  var RightSideCurves = STRUCT([curve2,SurfaceRTube5,SurfaceRTube6,SurfaceRTube,SurfaceRTube2,SurfaceRTube3,SurfaceRTube4]);
  //left Side
  var LeftSideCurves = R([0,1])([PI])(RightSideCurves);
  var SuperiorTube = STRUCT([SurfaceRTube7,SurfaceRTube8])

  var FirstTube = STRUCT([curve2,LeftSideCurves,RightSideCurves,SuperiorTube])
  var SecondTube = R([0,1])([PI/2])(FirstTube)

    var Tubes = STRUCT([FirstTube,SecondTube]);
    return Tubes;
}

//towel funtion
var getTowel = function(){
  //Right down side
  var controlpoints1 = [[1.8,0,2.1],
                        [2,0,2.4],
                        [2,0,2.2],
                        [2,0,2.8]]
  var curveMapping1 = BEZIER(S0)(controlpoints1);
  var curveTube1 = MAP(curveMapping1)(domain1D);

  var controlpoints2 = [[0,1.8,2.1],
                        [0,2,2.4],
                        [0,2,2.2],
                        [0,2,2.8]]
  var curveMapping2 = BEZIER(S0)(controlpoints2);
  var curveTube2 = MAP(curveMapping2)(domain1D);

  var controlpoints3 = [[1.8+0.2,0.05,2.1],
                        [2+0.2,0.05,2.4],
                        [2+0.2,0.05,2.2],
                        [2+0.2,0.05,2.8]]
  var curveMapping3 = BEZIER(S0)(controlpoints3);
  var curveTube3 = MAP(curveMapping3)(domain1D);

  var controlpoints4 = [[1.8-0.7,0.2,2.1],
                        [2-0.7,0.2,2.4],
                        [2-0.7,0.2,2.2],
                        [2-0.7,0.2,2.8]]
  var curveMapping4 = BEZIER(S0)(controlpoints4);
  var curveTube4 = MAP(curveMapping4)(domain1D);

  var controlpoints5 = [[0.05,1.8+0.2,2.1],
                        [0.05,2+0.2,2.4],
                        [0.05,2+0.2,2.2],
                        [0.05,2+0.2,2.8]]
  var curveMapping5 = BEZIER(S0)(controlpoints5);
  var curveTube5 = MAP(curveMapping5)(domain1D);
  
  var controlpoints6 = [[0.2,1.8-0.7,2.1],
                        [0.2,2-0.7,2.4],
                        [0.2,2-0.7,2.2],
                        [0.2,2-0.7,2.8]]
  var curveMapping6 = BEZIER(S0)(controlpoints6);
  var curveTube6 = MAP(curveMapping6)(domain1D);

  var towel1 = MAP(BEZIER(S1)([curveMapping1,curveMapping3,curveMapping4,curveMapping6,curveMapping5,curveMapping2]))(domain_surface_hermite)
  //parte centrale destra
  var height_variation= 0.5
  var controlpoints7 =  [[2,0,2.8],[2,0,3.5+height_variation]]
  var curveMapping7 = BEZIER(S0)(controlpoints7);
  var curveTube7 = MAP(curveMapping7)(domain1D);
  
  var controlpoints8 =  [[0,2,2.8],[0,2,3.5+height_variation]]
  var curveMapping8 = BEZIER(S0)(controlpoints8);
  var curveTube8 = MAP(curveMapping8)(domain1D);

  var controlpoints9 =  [[2+0.2,0.05,2.8],[2+0.2,0.05,3.5+height_variation]]
  var curveMapping9 = BEZIER(S0)(controlpoints9);
  var curveTube9 = MAP(curveMapping9)(domain1D);

  var controlpoints10 =  [[2-0.7,0.2,2.8],[2-0.7,0.2,3.5+height_variation]]
  var curveMapping10 = BEZIER(S0)(controlpoints10);
  var curveTube10 = MAP(curveMapping10)(domain1D);

  var controlpoints11 =  [[0.05,2+0.2,2.8],[0.05,2+0.2,3.5+height_variation]]
  var curveMapping11 = BEZIER(S0)(controlpoints11);
  var curveTube11 = MAP(curveMapping11)(domain1D);

  var controlpoints12 =  [[0.2,2-0.7,2.8],[0.2,2-0.7,3.5+height_variation]]
  var curveMapping12 = BEZIER(S0)(controlpoints12);
  var curveTube12 = MAP(curveMapping12)(domain1D);

  var towel2 = MAP(BEZIER(S1)([curveMapping7,curveMapping9,curveMapping10,curveMapping12,curveMapping11,curveMapping8]))(domain_surface_hermite)

  // superior side
  var controlpoints13 =  [[2,0,3.5+height_variation],
                            [1.97,0,3.5+height_variation+0.7],
                            [2.19,0,3.5+height_variation+0.4],
                            [1.5,0,3.5+height_variation+0.97]]

  var curveMapping13 = BEZIER(S0)(controlpoints13);
  var curveTube13 = MAP(curveMapping13)(domain1D);
  
  var controlpoints14 =  [[0,2,3.5+height_variation],
                            [0,1.97,3.5+height_variation+0.7],
                            [0,2.19,3.5+height_variation+0.4],
                            [0,1.5,3.5+height_variation+0.97]]

  var curveMapping14 = BEZIER(S0)(controlpoints14);
  var curveTube14 = MAP(curveMapping14)(domain1D);

  var controlpoints15 =  [[2+0.2,0.05,3.5+height_variation],
                            [1.97+0.2,0.05,3.5+height_variation+0.7],
                            [2.19+0.2,0.05,3.5+height_variation+0.4],
                            [1.5+0.2,0.05,3.5+height_variation+0.97]]

  var curveMapping15 = BEZIER(S0)(controlpoints15);
  var curveTube15 = MAP(curveMapping15)(domain1D);

  var controlpoints16 =  [[0.05,2+0.2,3.5+height_variation],
                            [0.05,1.97+0.2,3.5+height_variation+0.7],
                            [0.05,2.19+0.2,3.5+height_variation+0.4],
                            [0.05,1.5+0.2,3.5+height_variation+0.97]]

  var curveMapping16 = BEZIER(S0)(controlpoints16);
  var curveTube16 = MAP(curveMapping16)(domain1D);

  var controlpoints17 =  [[2-0.7,0.2,3.5+height_variation],
                            [1.97-0.7,0.2,3.5+height_variation+0.7],
                            [2.19-0.7,0.2,3.5+height_variation+0.4],
                            [1.5-0.7,0.2,3.5+height_variation+0.97]]
  var curveMapping17 = BEZIER(S0)(controlpoints17);
  var curveTube17 = MAP(curveMapping17)(domain1D);

  
 var controlpoints18 =  [[0.2,2-0.7,3.5+height_variation],
                            [0.2,1.97-0.7,3.5+height_variation+0.7],
                            [0.2,2.19-0.7,3.5+height_variation+0.4],
                            [0.2,1.5-0.7,3.5+height_variation+0.97]]

  var curveMapping18 = BEZIER(S0)(controlpoints18);
  var curveTube18 = MAP(curveMapping18)(domain1D);

  var towel3 = MAP(BEZIER(S1)([curveMapping13,curveMapping15,curveMapping17,curveMapping18,curveMapping16,curveMapping14]))(domain_surface_hermite)

  completetowel=STRUCT([COLOR(TOWEL)(towel1),COLOR(TOWEL)(towel2),COLOR(TOWEL)(towel3)])
  completetowel2 =R([0,1])([PI/2])(completetowel)
  completetowel3 =R([0,1])([PI/2])(completetowel2)
  completetowel4 =R([0,1])([PI/2])(completetowel3)

  var Towels =STRUCT([completetowel,completetowel2,completetowel3,completetowel4])
  return Towels;
}

var Base = T([0,1])([-1,-1])(getBase());
var Bulb = getBulb();
var Tubes = getTube();
var Towels = getTowel();

var getLamp =function(){
  var Lamp =STRUCT([Base,Bulb,Tubes,Towels])
  return Lamp;
}

var Lamp = getLamp();
DRAW(Lamp);