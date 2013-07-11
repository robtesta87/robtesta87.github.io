/*
Roberto Testa
Matricola Number:465341
Computational Graphics
Object: Final Room with 3 Non conformist Chair, 2 Lamp Bali and one EMTable
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
var BLUE = [178/255,255/255,255/255,0.8];
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

function knots (controls) {
  var len = controls.length+3;
  var knots = [];
  knots[0] = 0;
  knots[1] = 0;
  knots[2] = 0;
  for (var i = 3; i <= len-4; i++) {
    knots[i] = i-2;
  };
  knots[len-1] = len-5;
  knots[len-2] = len-5;
  knots[len-3] = len-5;
  return knots;
};

var mappingCircleLeg11=horizontalCircle(0.15,0,0.15,0.15);
var mappingCircleLeg12=horizontalCircle(0.15,6.9,0.15,0.15);


var getLegBase = function(){
        //leg1 - posterior right
        var leg1= MakeBezierSurface([[mappingCircleLeg11,mappingCircleLeg12],[mappingCircleLeg11,[0.07,0.07,0.001]]]);

        // right base
        var controlpointsBase1 = [[0.15,0.15,0],[5,0.15,0]];
        var curveMappingBase1 = BEZIER(S0)(controlpointsBase1);

        var controlpointsBase2 = [[0.15,0.15,0.3],[5,0.15,0.3]];
        var curveMappingBase2 = BEZIER(S0)(controlpointsBase2);

        var Linebase1 = MAP(curveMappingBase1)(domain1D);
        var Linebase11 = MAP(curveMappingBase2)(domain1D);

        var sup_hermiteBase1 = CUBIC_HERMITE(S1)([curveMappingBase1,curveMappingBase2,[0,0.6,0],[0,-0.6,0]]);
        var SurfaceBase1 = MAP(sup_hermiteBase1)(domain_surface_hermite);
        var sup_hermiteBase11 = CUBIC_HERMITE(S1)([curveMappingBase1,curveMappingBase2,[0,-0.6,0],[0,0.6,0]]);
        var SurfaceBase11 = MAP(sup_hermiteBase11)(domain_surface_hermite);

        //Curve Base rigth
        var controlpointsBase3 = [[5,0.15,0],[5.5,0.15,0.5],[1,0,0],[0,0,1]];
        var curveMappingBase3 = CUBIC_HERMITE(S0)(controlpointsBase3);

        var controlpointsBase4 = [[5,0.15,2*0.15],[5.5-(2*0.15),0.15,0.5],[0.5,0,0],[0,0,0.5]];
        var curveMappingBase4 = CUBIC_HERMITE(S0)(controlpointsBase4);

        var curveBase = MAP(curveMappingBase3)(domain1D);
        var curveBase2 = MAP(curveMappingBase4)(domain1D);

        var sup_hermiteBase2 = CUBIC_HERMITE(S1)([curveMappingBase3,curveMappingBase4,[0,0.6,0],[0,-0.6,0]]);
        var CurveSurfaceBase1 = MAP(sup_hermiteBase2)(domain_surface_hermite);
        var sup_hermiteBase22 = CUBIC_HERMITE(S1)([curveMappingBase3,curveMappingBase4,[0,-0.6,0],[0,0.6,0]]);
        var CurveSurfaceBase2 = MAP(sup_hermiteBase22)(domain_surface_hermite);

        //Rigth leg 2 
        var controlpointsBase5 = [[5.5,0.15,0.5],[5.5,0.15,3.5]];
        var curveMappingBase5 = BEZIER(S0)(controlpointsBase5);

        var controlpointsBase6 = [[5.5-(2*0.15),0.15,0.5],[5.5-(2*0.15),0.15,3.5]];
        var curveMappingBase6 = BEZIER(S0)(controlpointsBase6);

        var sup_hermiteleg11 = CUBIC_HERMITE(S1)([curveMappingBase5,curveMappingBase6,[0,0.6,0],[0,-0.6,0]]);
        var CurveSurfaceleg1 = MAP(sup_hermiteleg11)(domain_surface_hermite);
        var sup_hermiteleg22 = CUBIC_HERMITE(S1)([curveMappingBase5,curveMappingBase6,[0,-0.6,0],[0,0.6,0]]);
        var CurveSurfaceleg2 = MAP(sup_hermiteleg22)(domain_surface_hermite);

        //Left Base
        var controlpointsBase7 = [[0.15,0.15+5.6,0],[5,0.15+5.6,0]];
        var curveMappingBase7 = BEZIER(S0)(controlpointsBase7);

        var controlpointsBase8 = [[0.15,0.15+5.6,0.3],[5,0.15+5.6,0.3]];
        var curveMappingBase8 = BEZIER(S0)(controlpointsBase8);

        var sup_hermiteBase3 = CUBIC_HERMITE(S1)([curveMappingBase7,curveMappingBase8,[0,0.6,0],[0,-0.6,0]]);
        var CurveSurfaceBase3 = MAP(sup_hermiteBase3)(domain_surface_hermite);
        var sup_hermiteBase33 = CUBIC_HERMITE(S1)([curveMappingBase7,curveMappingBase8,[0,-0.6,0],[0,0.6,0]]);
        var CurveSurfaceBase33 = MAP(sup_hermiteBase33)(domain_surface_hermite);

        //Curve Base left
        var controlpointsBase9 = [[5,0.15+5.6,0],[5.5,0.15+5.6,0.5],[1,0,0],[0,0,1]];
        var curveMappingBase9 = CUBIC_HERMITE(S0)(controlpointsBase9);

        var controlpointsBase10 = [[5,0.15+5.6,2*0.15],[5.5-(2*0.15),0.15+5.6,0.5],[0.5,0,0],[0,0,0.5]];
        var curveMappingBase10 = CUBIC_HERMITE(S0)(controlpointsBase10);

        var curveBase3 = MAP(curveMappingBase9)(domain1D);
        var curveBase4 = MAP(curveMappingBase10)(domain1D);

        var sup_hermiteBase44 = CUBIC_HERMITE(S1)([curveMappingBase9,curveMappingBase10,[0,0.6,0],[0,-0.6,0]]);
        var CurveSurfaceBase4 = MAP(sup_hermiteBase44)(domain_surface_hermite);
        var sup_hermiteBase55 = CUBIC_HERMITE(S1)([curveMappingBase9,curveMappingBase10,[0,-0.6,0],[0,0.6,0]]);
        var CurveSurfaceBase5 = MAP(sup_hermiteBase55)(domain_surface_hermite);

        //leg anteriore left
        var controlpointsBase11 = [[5.5,0.15+5.6,0.5],[5.5,0.15+5.6,4.128]];
        var curveMappingBase11 = BEZIER(S0)(controlpointsBase11);

        var controlpointsBase12 = [[5.5-(2*0.15),0.15+5.6,0.5],[5.5-(2*0.15),0.15+5.6,4]];
        var curveMappingBase12 = BEZIER(S0)(controlpointsBase12);

        var sup_hermiteleg33 = CUBIC_HERMITE(S1)([curveMappingBase11,curveMappingBase12,[0,0.6,0],[0,-0.6,0]]);
        var CurveSurfaceleg3 = MAP(sup_hermiteleg33)(domain_surface_hermite);
        var sup_hermiteleg44 = CUBIC_HERMITE(S1)([curveMappingBase11,curveMappingBase12,[0,-0.6,0],[0,0.6,0]]);
        var CurveSurfaceleg4 = MAP(sup_hermiteleg44)(domain_surface_hermite);

        var LegBase = STRUCT([leg1,SurfaceBase1,SurfaceBase11,CurveSurfaceBase1,CurveSurfaceBase2,CurveSurfaceleg1,
                              CurveSurfaceleg2,CurveSurfaceleg3,CurveSurfaceBase3,CurveSurfaceBase33,CurveSurfaceBase4,
                              CurveSurfaceBase5,CurveSurfaceleg4])
        return LegBase;
}

var getHandRailSkeleton = function(){
        //LEFT HAND RAIL TUBE
        var controlpointsLeftTube1 = [[5.2,5.6+0.15,4],[0.4,5.6+0.15,7.0564-0.3]];
        var MappingLeftTube1 = BEZIER(S0)(controlpointsLeftTube1);
        var controlpointsLeftTube2 = [[5.5,5.6+0.15,4.128],[0.4,5.6+0.15,7.0564]];
        var MappingLeftTube2 = BEZIER(S0)(controlpointsLeftTube2);
        
        var sup_hermiteLeftTube1 = CUBIC_HERMITE(S1)([MappingLeftTube1,MappingLeftTube2,[0,0.6,0],[0,-0.6,0]]);
        var SurfaceLeftTube1 = MAP(sup_hermiteLeftTube1)(domain_surface_hermite);
        var sup_hermiteLeftTube2 = CUBIC_HERMITE(S1)([MappingLeftTube1,MappingLeftTube2,[0,-0.6,0],[0,0.6,0]]);
        var SurfaceLeftTube2 = MAP(sup_hermiteLeftTube2)(domain_surface_hermite);
        
        //Curve Left Tube (HANDRAIL)
        var controlpointsLeftTube3 = [[0.3,5.4,6.9+0.15],[0.4,5.6,7.0564-0.15],[0,0.3,0],[0.3,0,-0.3]];
        var curveMappingLeftTube3 = CUBIC_HERMITE(S0)(controlpointsLeftTube3);

        var controlpointsLeftTube4 = [[0,5.4,6.9+0.15],[0.4,5.6+0.3,7.0564-0.15],[0,1.4,0],[1.2,0,-0.8]];
        var curveMappingLeftTube4 = CUBIC_HERMITE(S0)(controlpointsLeftTube4);

        var curveLeftTube = MAP(curveMappingLeftTube3)(domain1D);
        var curveLeftTube2 = MAP(curveMappingLeftTube4)(domain1D);
        
        var sup_hermiteLeftTube3 = CUBIC_HERMITE(S1)([curveMappingLeftTube3,curveMappingLeftTube4,[0,0,0.6],[0,0,-0.6]]);
        var SurfaceLeftTube3 = MAP(sup_hermiteLeftTube3)(domain_surface_hermite);
        var sup_hermiteLeftTube4 = CUBIC_HERMITE(S1)([curveMappingLeftTube3,curveMappingLeftTube4,[0,0,-0.6],[0,0,0.6]]);
        var SurfaceLeftTube4 = MAP(sup_hermiteLeftTube4)(domain_surface_hermite);
      
        //Curve Right Tube(HANDRAIL)
        var controlpointsRTube1 = [[5.2,0.15,0.3+3.3],[5.7,-0.7,0.3+3.3],[0,-1.4,0],[1.4,0,0]];
        var curveMappingRTube1 = CUBIC_HERMITE(S0)(controlpointsRTube1);

        var controlpointsRTube2 = [[5.5,0.15,0.3+3.3],[5.7,-0.4,0.3+3.3],[0,-0.5,0],[0.8,0,0]];
        var curveMappingRTube2 = CUBIC_HERMITE(S0)(controlpointsRTube2);

        var curveRTube = MAP(curveMappingRTube1)(domain1D);
        var curveRTube2 = MAP(curveMappingRTube2)(domain1D);
        
        var sup_hermiteRTube1 = CUBIC_HERMITE(S1)([curveMappingRTube1,curveMappingRTube2,[0,0,0.6],[0,0,-0.6]]);
        var SurfaceRTube1 = MAP(sup_hermiteRTube1)(domain_surface_hermite);
        var sup_hermiteRTube2 = CUBIC_HERMITE(S1)([curveMappingRTube1,curveMappingRTube2,[0,0,-0.6],[0,0,0.6]]);
        var SurfaceRTube2 = MAP(sup_hermiteRTube2)(domain_surface_hermite);
       
        //Curve Right Tube 2 (HANDRAIL)
        var controlpointsRTube3 = [[5.7,-0.7+0.15,0.15+3.3],[6,-0.7+0.15,0.15+3.3+0.5],[1,0,0],[0,0,1]];
        var curveMappingRTube3 = CUBIC_HERMITE(S0)(controlpointsRTube3);

        var controlpointsRTube4 = [[5.7,-0.7+0.15,0.45+3.3],[5.7,-0.7+0.15,0.15+3.3+0.5],[0,0,0],[0,0,1]];
        var curveMappingRTube4 = CUBIC_HERMITE(S0)(controlpointsRTube4);

        var curveRTube3 = MAP(curveMappingRTube3)(domain1D);
        var curveRTube4 = MAP(curveMappingRTube4)(domain1D);
        
        var sup_hermiteRTube3 = CUBIC_HERMITE(S1)([curveMappingRTube3,curveMappingRTube4,[0,0.6,0],[0,-0.6,0]]);
        var SurfaceRTube3 = MAP(sup_hermiteRTube3)(domain_surface_hermite);
        var sup_hermiteRTube4 = CUBIC_HERMITE(S1)([curveMappingRTube3,curveMappingRTube4,[0,-0.6,0],[0,0.6,0]]);
        var SurfaceRTube4 = MAP(sup_hermiteRTube4)(domain_surface_hermite);
        
        //Curve Right Tube 3 (HANDRAIL)
        var controlpointsRTube5 = [[6,-0.7+0.15,0.15+3.3+0.5],[4,-0.7+0.15,0.15+3.3+0.5+2.5],[0,0,7],[-2,0,0.8]];
        var curveMappingRTube5 = CUBIC_HERMITE(S0)(controlpointsRTube5);

        var controlpointsRTube6 = [[6-0.3,-0.7+0.15,0.15+3.3+0.5],[4,-0.7+0.15,0.15+3.3+0.5+2.5-0.3],[0,0,6.5],[-2,0,0.8]];
        var curveMappingRTube6 = CUBIC_HERMITE(S0)(controlpointsRTube6);

        var curveRTube5 = MAP(curveMappingRTube5)(domain1D);
        var curveRTube6 = MAP(curveMappingRTube6)(domain1D);
        
        var sup_hermiteRTube5 = CUBIC_HERMITE(S1)([curveMappingRTube5,curveMappingRTube6,[0,0.6,0],[0,-0.6,0]]);
        var SurfaceRTube5 = MAP(sup_hermiteRTube5)(domain_surface_hermite);
        var sup_hermiteRTube6 = CUBIC_HERMITE(S1)([curveMappingRTube5,curveMappingRTube6,[0,-0.6,0],[0,0.6,0]]);
        var SurfaceRTube6 = MAP(sup_hermiteRTube6)(domain_surface_hermite);
       
        //Curve Right Tube 4(HANDRAIL)
        var controlpointsRTube7 = [[4,-0.7+0.15,0.15+3.3+0.5+2.5],[0.4,-0.7+0.15,6.8708+0.3],[-2,0,0.5],[-2,0,0.5]];
        var curveMappingRTube7 = CUBIC_HERMITE(S0)(controlpointsRTube7);

        var controlpointsRTube8 = [[4,-0.7+0.15,0.15+3.3+0.5+2.5-0.3],[0.4,-0.7+0.15,6.8708+0.3-0.3],[-2,0,0.5],[-2,0,0.5]];
        var curveMappingRTube8 = CUBIC_HERMITE(S0)(controlpointsRTube8);

        var curveRTube7 = MAP(curveMappingRTube7)(domain1D);
        var curveRTube8 = MAP(curveMappingRTube8)(domain1D);
        
        var sup_hermiteRTube7 = CUBIC_HERMITE(S1)([curveMappingRTube7,curveMappingRTube8,[0,0.6,0],[0,-0.6,0]]);
        var SurfaceRTube7 = MAP(sup_hermiteRTube7)(domain_surface_hermite);
        var sup_hermiteRTube8 = CUBIC_HERMITE(S1)([curveMappingRTube7,curveMappingRTube8,[0,-0.6,0],[0,0.6,0]]);
        var SurfaceRTube8 = MAP(sup_hermiteRTube8)(domain_surface_hermite);

        //Curve Right Tube 5(HANDRAIL)
        var controlpointsRTube9 = [[0.4,-0.7+0.15+0.15,6.8708+0.3-0.3+0.15],[0.3,0.15,6.9+0.15],[-0.5,0,0.125],[0,0.5,0]];
        var curveMappingRTube9 = CUBIC_HERMITE(S0)(controlpointsRTube9);

        var controlpointsRTube10 = [[0.4,-0.7+0.15+0.15-0.3,6.8708+0.3-0.3+0.15],[0,0.15,6.9+0.15],[-1.5,0,0.375],[0,0.5,0]];
        var curveMappingRTube10 = CUBIC_HERMITE(S0)(controlpointsRTube10);

        var curveRTube9 = MAP(curveMappingRTube9)(domain1D);
        var curveRTube10 = MAP(curveMappingRTube10)(domain1D);
        
        var sup_hermiteRTube9 = CUBIC_HERMITE(S1)([curveMappingRTube9,curveMappingRTube10,[0,0,0.6],[0,0,-0.6]]);
        var SurfaceRTube9 = MAP(sup_hermiteRTube9)(domain_surface_hermite);
        var sup_hermiteRTube10 = CUBIC_HERMITE(S1)([curveMappingRTube9,curveMappingRTube10,[0,0,-0.6],[0,0,0.6]]);
        var SurfaceRTube10 = MAP(sup_hermiteRTube10)(domain_surface_hermite);

        var HandRailSkeleton = STRUCT([SurfaceLeftTube1,SurfaceLeftTube2,SurfaceLeftTube3,SurfaceLeftTube4,
                                      SurfaceRTube1,SurfaceRTube2,SurfaceRTube3,SurfaceRTube4,SurfaceRTube5,
                                      SurfaceRTube6,SurfaceRTube7,SurfaceRTube8,SurfaceRTube9,SurfaceRTube10])
        return HandRailSkeleton;
}

var getSupportSeat = function(){
        //supporto davanti seduta
        var controlpointsSeat1 = [[5.2+0.15,0.15,0.15+3.3],[5.2+0.15,5.6+0.15,0.15+3.3]];
        var SupportMappingSeat1 = BEZIER(S0)(controlpointsSeat1);
        
        var controlpointsSeat2 = [[5.2+0.15,0.15,0.15+3.3+0.3],[5.2+0.15,5.6+0.15,0.15+3.3+0.3]];
        var SupportMappingSeat2 = BEZIER(S0)(controlpointsSeat2);
        
        var sup_hermiteSeat1 = CUBIC_HERMITE(S1)([SupportMappingSeat1,SupportMappingSeat2,[0.6,0,0],[-0.6,0,0]]);
        var CurveSurfaceSeat1 = MAP(sup_hermiteSeat1)(domain_surface_hermite);
        var sup_hermiteSeat2 = CUBIC_HERMITE(S1)([SupportMappingSeat1,SupportMappingSeat2,[-0.6,0,0],[0.6,0,0]]);
        var CurveSurfaceSeat2 = MAP(sup_hermiteSeat2)(domain_surface_hermite);
        
        //back support Seat
        //Right Part
        var heigth_back_support_seat1=0;
        var traslation=0.15;
        var P0 = [[traslation,-0.15+traslation,0],
                  [traslation,-0.15+traslation,+0.15],
                  [traslation,0.15+traslation,+0.15],
                  [traslation,0.15+traslation,0]]

        var knots1 = knots(P0);
        var c1 = NUBS(S0)(2)(knots1)(P0)
        var p1 = MAP(c1)(domain1D)
        
        var P1 = [[1.5,-0.15+traslation,0],
          [1.5,-0.15+traslation,+0.15],
          [1.5-0.3,0.15+traslation,+0.15],
          [1.5-0.3,0.15+traslation,0]]

        var knots2 = knots(P1);
        var c2 = NUBS(S0)(2)(knots2)(P1)
        var p2 = MAP(c2)(domain1D)
        
        var sup1= T([2])([2.5])(R([0,2])([-PI/6])(MAP(BEZIER(S1)([c1,c2]))(domain_surface_hermite)))

        var P3 = [[traslation,-0.15+traslation,0],
                [traslation,-0.15+traslation,-0.15],
                [traslation,0.15+traslation,-0.15],
                [traslation,0.15+traslation,0]]

        var knots3 = knots(P3);
        var c3 = NUBS(S0)(2)(knots3)(P3)
        var p3 = MAP(c3)(domain1D)


        var P4 = [[1.5,-0.15+traslation,heigth_back_support_seat1],
                  [1.5,-0.15+traslation,heigth_back_support_seat1-0.15],
                  [1.5-0.3,0.15+traslation,heigth_back_support_seat1-0.15],
                  [1.5-0.3,0.15+traslation,heigth_back_support_seat1]]

        var knots4 = knots(P4);
        var c4 = NUBS(S0)(2)(knots4)(P4)
        var p4 = MAP(c4)(domain1D)

        var sup2= T([2])([2.5])(R([0,2])([-PI/6])(MAP(BEZIER(S1)([c3,c4]))(domain_surface_hermite)))

        //central Support Seat
        var P5 = [[1.5,5.9,0],
                  [1.5,5.9,+0.15],
                  [1.5-0.3,-0.2+5.9,+0.15],
                  [1.5-0.3,-0.2+5.9,0]]

        var knots5 = knots(P5);
        var c5 = NUBS(S0)(2)(knots5)(P5)
        var p5 = MAP(c5)(domain1D)

        var sup3= T([2])([2.5])(R([0,2])([-PI/6])(MAP(BEZIER(S1)([c5,c2]))(domain_surface_hermite)))

        var P6 = [[1.5,5.9,heigth_back_support_seat1],
                  [1.5,5.9,heigth_back_support_seat1-0.15],
                  [1.5-0.3,-0.2+5.9,heigth_back_support_seat1-0.15],
                  [1.5-0.3,-0.2+5.9,heigth_back_support_seat1]]

        var knots6 = knots(P6);
        var c6 = NUBS(S0)(2)(knots6)(P6)
        var p6 = MAP(c6)(domain1D)

        var sup4= T([2])([2.5])(R([0,2])([-PI/6])(MAP(BEZIER(S1)([c6,c4]))(domain_surface_hermite)))

        //Left Support Seat
        heigth_back_support_seat1=2.8+(1.5*SIN(PI/6))+SIN(2.5+(1.5*SIN(PI/6)))

        var P7 = [[1.5-heigth_back_support_seat1,5.9,0],
                  [1.5-heigth_back_support_seat1,5.9,+0.15],
                  [1.5-heigth_back_support_seat1,-0.3+5.9,+0.15],
                  [1.5-heigth_back_support_seat1,-0.3+5.9,0]]

        var knots7 = knots(P7);
        var c7 = NUBS(S0)(2)(knots7)(P7)
        var p7 = MAP(c7)(domain1D)

        var P8 = [[1.5-heigth_back_support_seat1,5.9,0],
                  [1.5-heigth_back_support_seat1,5.9,-0.15],
                  [1.5-heigth_back_support_seat1,-0.3+5.9,-0.15],
                  [1.5-heigth_back_support_seat1,-0.3+5.9,0]]

        var knots8 = knots(P8);
        var c8 = NUBS(S0)(2)(knots8)(P8)
        var p8 = MAP(c8)(domain1D)

        var P55 = [[1.5,5.9,0],
                  [1.5,5.9,+0.15],
                  [1.5-0.2,-0.3+5.9,+0.15],
                  [1.5-0.2,-0.3+5.9,0]]

        var knots55 = knots(P55);
        var c55 = NUBS(S0)(2)(knots5)(P55)
        var p55 = MAP(c55)(domain1D)

        var P66 = [[1.5,5.9,0],
                  [1.5,5.9,-0.15],
                  [1.5-0.2,-0.3+5.9,-0.15],
                  [1.5-0.2,-0.3+5.9,0]]

        var knots66 = knots(P66);
        var c66 = NUBS(S0)(2)(knots66)(P66)
        var p66 = MAP(c66)(domain1D)

        var sup5= T([0,1,2])([0.75,0.02,1.9])(R([0,2])([-PI/2.5])(MAP(BEZIER(S1)([c55,c7]))(domain_surface_hermite)))

        var sup6= T([0,1,2])([0.75,0.02,1.9])(R([0,2])([-PI/2.5])(MAP(BEZIER(S1)([c66,c8]))(domain_surface_hermite)))

        var sup7= T([0,1,2])([0.75,0.02,1.9])(R([0,2])([-PI/2.5])(MAP(BEZIER(S1)([c5,[1.5,5.9,0.0001]]))(domain_surface_hermite)))

        var sup8= T([0,1,2])([0.75,0.02,1.9])(R([0,2])([-PI/2.5])(MAP(BEZIER(S1)([c8,[1.5-heigth_back_support_seat1,-0.3+5.9,0.0001]]))(domain_surface_hermite)))

        var sup9= T([0,1,2])([0.75,0.02,1.9])(R([0,2])([-PI/2.5])(MAP(BEZIER(S1)([c7,[1.5-heigth_back_support_seat1,-0.3+5.9,0.0001]]))(domain_surface_hermite)))

        var SupportSeat = STRUCT([CurveSurfaceSeat1,CurveSurfaceSeat2,sup1,sup2,sup3,sup4,sup5,sup6,sup7,sup8,sup9])
        return SupportSeat;
}

//support BackRest
var getSupportBackRest = function(){
        var controlpointsBase13 = [[0.15,0.15,6.9],[0.15,5.4,6.9]];
        var curveMappingBase13 = BEZIER(S0)(controlpointsBase13);
        
        var controlpointsBase14 = [[0.15,0.15,6.9+0.3],[0.15,5.4,6.9+0.3]];
        var curveMappingBase14 = BEZIER(S0)(controlpointsBase14);
        
        var sup_hermiteBackrest1 = CUBIC_HERMITE(S1)([curveMappingBase13,curveMappingBase14,[0.6,0,0],[-0.6,0,0]]);
        var CurveSurfaceBackrest1 = MAP(sup_hermiteBackrest1)(domain_surface_hermite);
        var sup_hermiteBackrest2 = CUBIC_HERMITE(S1)([curveMappingBase13,curveMappingBase14,[-0.6,0,0],[0.6,0,0]]);
        var CurveSurfaceBackrest2 = MAP(sup_hermiteBackrest2)(domain_surface_hermite);
        
        var SupportBackRest = STRUCT([CurveSurfaceBackrest1,CurveSurfaceBackrest2])
        return SupportBackRest;
}

var getPillowSeat = function(){
        var controlpointsSeat3 = [[0.7,0.4,2.8],[5.8,0.4,3.4]];
        var curveMappingSeat3 = BEZIER(S0)(controlpointsSeat3);

        var controlpointsSeat4 = [[0.7,0.4,2.8],[0.5,0.4,3],[-1.5,0.4,5],[4,0.4,4],[8,0.4,6.5],[6,0.4,3.6],[5.8,0.4,3.4]];
        var curveMappingSeat4 = BEZIER(S0)(controlpointsSeat4);
        sewing1= MAP(curveMappingSeat4)(domain1D)

        var controlpointsSeat5 = [[0.7,5.5,2.8],[5.8,5.5,3.4]];
        var curveMappingSeat5 = BEZIER(S0)(controlpointsSeat5);
        
        var controlpointsSeat6 = [[0.7,5.5,2.8],[0.5,5.5,3],[-1.5,5.5,5],[4,5.5,4],[8,5.5,6.5],[6,5.5,3.6],[5.8,5.5,3.4]];
        var curveMappingSeat6 = BEZIER(S0)(controlpointsSeat6);
        sewing2 = MAP(curveMappingSeat6)(domain1D)

        var controlpointsSeat7 = [[0.9,0.35,3],[5.6,0.35,3.6]];
        var curveMappingSeat7 = BEZIER(S0)(controlpointsSeat7);
        
        var controlpointsSeat8 = [[0.9,0.35,3],[0.6,0.35,2.8],[-1.3,0.35,4.8],[3.8,0.35,3.8],[7.8,0.35,6.3],[5.8,0.35,3.4],[5.6,0.35,3.6]];
        var curveMappingSeat8 = BEZIER(S0)(controlpointsSeat8);
        
        var controlpointsSeat9 = [[0.9,5.55,3],[5.6,5.55,3.6]];
        var curveMappingSeat9 = BEZIER(S0)(controlpointsSeat9);
        
        var controlpointsSeat10 = [[0.9,5.55,3],[0.6,5.55,2.8],[-1.3,5.55,4.8],[3.8,5.55,3.8],[7.8,5.55,6.3],[5.8,5.55,3.4],[5.6,5.55,3.6]];
        var curveMappingSeat10 = BEZIER(S0)(controlpointsSeat10);

        var controlpointsSeat_array = new Array (21);
        var curveMappingSeat_array = new Array (21);
        controlpointsSeat_array[0] = [[0.7,0.4+0.85,2.8],[5.8,0.4+0.85,3.4]];
        curveMappingSeat_array[0] = BEZIER(S0)(controlpointsSeat_array[0]);
        sewing3 = MAP(curveMappingSeat_array[0])(domain1D)

        controlpointsSeat_array[1] = [[0.7,0.4+0.85,2.8],[0.5,0.4+0.85,3],[-1.5,0.4+0.85,5],[4,0.4+0.85,4],[8,0.4+0.85,6.5],[6,0.4+0.85,3.6],[5.8,0.4+0.85,3.4]]
        curveMappingSeat_array[1] = BEZIER(S0)(controlpointsSeat_array[1]);
        sewing4 = MAP(curveMappingSeat_array[1])(domain1D)
        
        var traslation= 0.85;
        var sewing_array = new Array (21);
        for (var i = 2; i <= 10; i=i+2) {
          controlpointsSeat_array[i] = [[0.7,0.4+0.85+traslation,2.8],[5.8,0.4+0.85+traslation,3.4]];
          curveMappingSeat_array[i] = BEZIER(S0)(controlpointsSeat_array[i]);
          sewing_array[i] = MAP(curveMappingSeat_array[i])(domain1D)
          controlpointsSeat_array[i+1] = [[0.7,0.4+0.85+traslation,2.8],
                                          [0.5,0.4+0.85+traslation,3],
                                          [-1.5,0.4+0.85+traslation,5],
                                          [4,0.4+0.85+traslation,4],
                                          [8,0.4+0.85+traslation,6.5],
                                          [6,0.4+0.85+traslation,3.6],
                                          [5.8,0.4+0.85+traslation,3.4]]
          curveMappingSeat_array[i+1] = BEZIER(S0)(controlpointsSeat_array[i+1]);
          sewing_array[i+1] = MAP(curveMappingSeat_array[i+1])(domain1D)
          traslation=traslation+0.85;
        };

        //Central Seat with puffyEffect(seduta centrale curve più grandi per creare effetto gonfiato)
        var puffyEffect=0.3
        traslation=0.85
        controlpointsSeat_array[11] = [[0.7-puffyEffect,0.4+0.45,2.8],[5.8+puffyEffect,0.4+0.45,3.4]];
        curveMappingSeat_array[11] = BEZIER(S0)(controlpointsSeat_array[11]);
        controlpointsSeat_array[12] = [[0.7-puffyEffect,0.4+0.45,2.8],
                                    [0.5-puffyEffect,0.4+0.45,3+puffyEffect],
                                    [-1.5-puffyEffect,0.4+0.45,5+puffyEffect],
                                    [4+puffyEffect,0.4+0.45,4+puffyEffect],
                                    [8+puffyEffect,0.4+0.45,6.5+puffyEffect],
                                    [6+puffyEffect,0.4+0.45,3.6+puffyEffect],
                                    [5.8+puffyEffect,0.4+0.45,3.4]];
        curveMappingSeat_array[12] = BEZIER(S0)(controlpointsSeat_array[12]);

        for (var i = 13; i <= 21; i=i+2) {
           controlpointsSeat_array[i] = [[0.7-puffyEffect,0.4+0.45+traslation,2.8],[5.8+puffyEffect,0.4+0.45+traslation,3.4]];
           curveMappingSeat_array[i] = BEZIER(S0)(controlpointsSeat_array[i]);
           controlpointsSeat_array[i+1] = [[0.7-0.4,0.4+0.45+traslation,2.8],
                                            [0.5-puffyEffect,0.4+0.45+traslation,3+puffyEffect],
                                            [-1.5-puffyEffect,0.4+0.45+traslation,5+puffyEffect],
                                            [4+puffyEffect,0.4+0.45+traslation,4+puffyEffect],
                                            [8+puffyEffect,0.4+0.45+traslation,6.5+puffyEffect],
                                            [6+puffyEffect,0.4+0.45+traslation,3.6+puffyEffect],
                                            [5.8+puffyEffect,0.4+0.45+traslation,3.4]];
            curveMappingSeat_array[i+1] = BEZIER(S0)(controlpointsSeat_array[i+1]);
            traslation=traslation+0.85;
        }

        var supSeat3= MAP(BEZIER(S1)([curveMappingSeat3,curveMappingSeat7,[4,0.3,3.2]]))(domain_surface_hermite)
        var supSeat4= MAP(BEZIER(S1)([curveMappingSeat4,curveMappingSeat8,[4,0.3,3.2]]))(domain_surface_hermite)

        var supSeat5= MAP(BEZIER(S1)([curveMappingSeat5,curveMappingSeat9,[4,5.6,3.2]]))(domain_surface_hermite)
        var supSeat6= MAP(BEZIER(S1)([curveMappingSeat6,curveMappingSeat10,[4,5.6,3.2]]))(domain_surface_hermite)

        var supSeat7= MAP(BEZIER(S1)([curveMappingSeat3,curveMappingSeat_array[11],curveMappingSeat_array[0]]))(domain_surface_hermite)
        var supSeat8= MAP(BEZIER(S1)([curveMappingSeat4,curveMappingSeat_array[12],curveMappingSeat_array[1]]))(domain_surface_hermite)

        var supSeat9= MAP(BEZIER(S1)([curveMappingSeat_array[0],curveMappingSeat_array[13],curveMappingSeat_array[2]]))(domain_surface_hermite)
        var supSeat10= MAP(BEZIER(S1)([curveMappingSeat_array[1],curveMappingSeat_array[14],curveMappingSeat_array[3]]))(domain_surface_hermite)

        var supSeat11= MAP(BEZIER(S1)([curveMappingSeat_array[2],curveMappingSeat_array[15],curveMappingSeat_array[4]]))(domain_surface_hermite)
        var supSeat12= MAP(BEZIER(S1)([curveMappingSeat_array[3],curveMappingSeat_array[16],curveMappingSeat_array[5]]))(domain_surface_hermite)

        var supSeat13= MAP(BEZIER(S1)([curveMappingSeat_array[4],curveMappingSeat_array[17],curveMappingSeat_array[6]]))(domain_surface_hermite)
        var supSeat14= MAP(BEZIER(S1)([curveMappingSeat_array[5],curveMappingSeat_array[18],curveMappingSeat_array[7]]))(domain_surface_hermite)

        var supSeat15= MAP(BEZIER(S1)([curveMappingSeat_array[6],curveMappingSeat_array[19],curveMappingSeat_array[8]]))(domain_surface_hermite)
        var supSeat16= MAP(BEZIER(S1)([curveMappingSeat_array[7],curveMappingSeat_array[20],curveMappingSeat_array[9]]))(domain_surface_hermite)


        var supSeat17= MAP(BEZIER(S1)([curveMappingSeat_array[8],curveMappingSeat_array[21],curveMappingSeat5]))(domain_surface_hermite)
        var supSeat18= MAP(BEZIER(S1)([curveMappingSeat_array[9],curveMappingSeat_array[22],curveMappingSeat6]))(domain_surface_hermite)

        var PillowSeat = STRUCT([sewing1,sewing2,sewing3,sewing4,
                                sewing_array[2],sewing_array[3],sewing_array[4],sewing_array[5],
                                sewing_array[6],sewing_array[7],sewing_array[8],sewing_array[9],
                                sewing_array[10],sewing_array[11],COLOR(BLACK)(supSeat3),COLOR(BLACK)(supSeat4),
                                COLOR(BLACK)(supSeat5),COLOR(BLACK)(supSeat6),COLOR(BLACK)(supSeat7),COLOR(BLACK)(supSeat8),
                                COLOR(BLACK)(supSeat9),COLOR(BLACK)(supSeat10),COLOR(BLACK)(supSeat11),COLOR(BLACK)(supSeat12),
                                COLOR(BLACK)(supSeat13),COLOR(BLACK)(supSeat14),COLOR(BLACK)(supSeat15),COLOR(BLACK)(supSeat16),
                                COLOR(BLACK)(supSeat17),COLOR(BLACK)(supSeat18)]);
        return PillowSeat;
}

var getPillowBackRest = function(){
        //backrest(poggiaschiena)
        var controlpointsBackRest_array = new Array (20);
        var curveMappingBackRest_array = new Array (20);
        controlpointsBackRest_array[0] = [[0.15,0.4,5.9+0.15],[0.5,0.4,5.9+0.15],[0.5,0.4,7.9+0.15],[0.15,0.4,7.9+0.15]];
        curveMappingBackRest_array[0] = BEZIER(S0)(controlpointsBackRest_array[0]);
        
        controlpointsBackRest_array[1] = [[0.15,5.5,5.9+0.15],[0.5,5.5,5.9+0.15],[0.5,5.5,7.9+0.15],[0.15,5.5,7.9+0.15]];
        curveMappingBackRest_array[1] = BEZIER(S0)(controlpointsBackRest_array[1]);
        
        BeginBackRestControlPoints = [[0.15,0.4,5.9+0.15],[0.15,0.4,7.9+0.15]]
        EndBackRestControlPoints = [[0.15,5.5,5.9+0.15],[0.15,5.5,7.9+0.15]];
        BegincurveMappingBackRest = BEZIER(S0)(BeginBackRestControlPoints);
        EndcurveMappingBackRest = BEZIER(S0)(EndBackRestControlPoints);

        traslation=0.85;
        var increasex=0.3;
        for (var i = 2; i <=5 ; i=i+2) {
                controlpointsBackRest_array[i] = [[0.15,0.4+traslation,5.9+0.15],
                                                    [0.5+increasex,0.4+traslation,5.9+0.15],
                                                    [0.5+increasex,0.4+traslation,7.9+0.15],
                                                    [0.15,0.4+traslation,7.9+0.15]];
                curveMappingBackRest_array[i] = BEZIER(S0)(controlpointsBackRest_array[i]);
                  
                controlpointsBackRest_array[i+1] = [[0.15,5.5-traslation,5.9+0.15],
                                                      [0.5+increasex,5.5-traslation,5.9+0.15],
                                                      [0.5+increasex,5.5-traslation,7.9+0.15],
                                                      [0.15,5.5-traslation,7.9+0.15]];
                curveMappingBackRest_array[i+1] = BEZIER(S0)(controlpointsBackRest_array[i+1]);
                traslation=traslation+0.85;
                increasex=increasex+0.6;
        }
        var surfaceBackRest= MAP(BEZIER(S1)([BegincurveMappingBackRest,
                                    curveMappingBackRest_array[0],
                                    curveMappingBackRest_array[2],
                                    curveMappingBackRest_array[4],
                                    curveMappingBackRest_array[3],
                                    curveMappingBackRest_array[5],
                                     curveMappingBackRest_array[1],
                                     EndcurveMappingBackRest
                                    ]))(domain_surface_hermite)
        //rear BackRest
        controlpointsBackRest_array[6] = [[0.15,0.4,5.9+0.15],[-0.5,0.4,5.9+0.15],[-0.5,0.4,7.9+0.15],[0.15,0.4,7.9+0.15]];
        curveMappingBackRest_array[6] = BEZIER(S0)(controlpointsBackRest_array[6]);

        controlpointsBackRest_array[7] = [[0.15,5.5,5.9+0.15],[-0.5,5.5,5.9+0.15],[-0.5,5.5,7.9+0.15],[0.15,5.5,7.9+0.15]];
        curveMappingBackRest_array[7] = BEZIER(S0)(controlpointsBackRest_array[7]);

        traslation=0.85;
        var increasex=0.3;
        for (i = 8; i <=11 ; i=i+2) {
          controlpointsBackRest_array[i] = [[0.15,0.4+traslation,5.9+0.15],
                                            [-0.5-increasex,0.4+traslation,5.9+0.15],
                                            [-0.5-increasex,0.4+traslation,7.9+0.15],
                                            [0.15,0.4+traslation,7.9+0.15]];
          curveMappingBackRest_array[i] = BEZIER(S0)(controlpointsBackRest_array[i]);
         
          controlpointsBackRest_array[i+1] = [[0.15,5.5-traslation,5.9+0.15],
                                              [-0.5-increasex,5.5-traslation,5.9+0.15],
                                              [-0.5-increasex,5.5-traslation,7.9+0.15],
                                              [0.15,5.5-traslation,7.9+0.15]];
          curveMappingBackRest_array[i+1] = BEZIER(S0)(controlpointsBackRest_array[i+1]);
          traslation=traslation+0.85;
          increasex=increasex+0.6;
        }

        var surfaceBackRest2= MAP(BEZIER(S1)([BegincurveMappingBackRest,
                                            curveMappingBackRest_array[6],
                                            curveMappingBackRest_array[8],
                                            curveMappingBackRest_array[10],
                                            curveMappingBackRest_array[9],
                                            curveMappingBackRest_array[11],
                                             curveMappingBackRest_array[7],
                                             EndcurveMappingBackRest
                                            ]))(domain_surface_hermite)





        var PillowBackRest = STRUCT([COLOR(BLACK)(surfaceBackRest),COLOR(BLACK)(surfaceBackRest2),]);
        return PillowBackRest
}

var getPillowHandRail = function(){
    //HAND RAIL
    var controlpointsHandRail = [[6,-0.7,0.15+3.3+0.5],
                                [4,-0.7,0.15+3.3+0.5+2.5],
                                [0,0,7],
                                [-2,0,0.8]];
    var curveMappingHandRail = CUBIC_HERMITE(S0)(controlpointsHandRail)

    var controlpointsHandRail2 = [[6,0,0.15+3.3+0.5],
                                [4,0,0.15+3.3+0.5+2.5],
                                [0,0,7],
                                [-2,0,0.8]];
    var curveMappingHandRail2 = CUBIC_HERMITE(S0)(controlpointsHandRail2);

    var curveHandRail = MAP(curveMappingHandRail)(domain1D);
    
    var curveHandRail2 = MAP(curveMappingHandRail2)(domain1D);
    

    var controlpointsHandRail3 = [[4,-0.7,0.15+3.3+0.5+2.5],
                                  [0.4,-0.7,6.8708+0.3],
                                  [-2,0,0.5],
                                  [-2,0,0.5]];
    var curveMappingHandRail3 = CUBIC_HERMITE(S0)(controlpointsHandRail3)

    var controlpointsHandRail4 = [[4,0,0.15+3.3+0.5+2.5],
                                  [0.4,0,6.8708+0.3],
                                  [-2,0,0.5],
                                  [-2,0,0.5]]; 
    var curveMappingHandRail4 = CUBIC_HERMITE(S0)(controlpointsHandRail4);

    var curveHandRail3 = MAP(curveMappingHandRail3)(domain1D);
    
    var curveHandRail4 = MAP(curveMappingHandRail4)(domain1D);
    
    var controlpointsHandRail5 = [[6-0.3,-0.7,0.15+3.3+0.5],
                              [4,-0.7,0.15+3.3+0.5+2.5-0.3],
                              [0,0,6.5],
                              [-2,0,0.8]]
    var curveMappingHandRail5 = CUBIC_HERMITE(S0)(controlpointsHandRail5)

    var controlpointsHandRail6 = [[6-0.3,0,0.15+3.3+0.5],
                                  [4,0,0.15+3.3+0.5+2.5-0.3],
                                  [0,0,6.5],
                                  [-2,0,0.8]]
    var curveMappingHandRail6 = CUBIC_HERMITE(S0)(controlpointsHandRail6);

    var curveHandRail5 = MAP(curveMappingHandRail5)(domain1D);
    
    var curveHandRail6 = MAP(curveMappingHandRail6)(domain1D);
    
    var controlpointsHandRail7 = [[4,-0.7,0.15+3.3+0.5+2.5-0.3],
                                  [0.4,-0.7,6.8708+0.3-0.3],
                                  [-2,0,0.5],
                                  [-2,0,0.5]]
    var curveMappingHandRail7 = CUBIC_HERMITE(S0)(controlpointsHandRail7)

    var controlpointsHandRail8 = [[4,0,0.15+3.3+0.5+2.5-0.3],
                                  [0.4,0,6.8708+0.3-0.3],
                                  [-2,0,0.5],
                                  [-2,0,0.5]]
    var curveMappingHandRail8 = CUBIC_HERMITE(S0)(controlpointsHandRail8);

    var controlpointsHandRail9 = [[4,-0.7-0.2,0.15+3.3+0.5+2.5-0.3-0.1],
                                  [0.4,-0.7-0.2,6.8708+0.3-0.3-0.1],
                                  [-2,0,0.5],
                                  [-2,0,0.5]]
    var curveMappingHandRail9 = CUBIC_HERMITE(S0)(controlpointsHandRail9)

    var controlpointsHandRail10 = [[4,-0.7,0.15+3.3+0.5+2.5-0.3-0.2],
                                  [0.4,-0.7,6.8708+0.3-0.3-0.2],
                                  [-2,0,0.5],
                                  [-2,0,0.5]]
    var curveMappingHandRail10 = CUBIC_HERMITE(S0)(controlpointsHandRail10);

    var controlpointsHandRail11 = [[4,0,0.15+3.3+0.5+2.5-0.3-0.2],
                                  [0.4,0,6.8708+0.3-0.3-0.2],
                                  [-2,0,0.5],
                                  [-2,0,0.5]]
    var curveMappingHandRail11 = CUBIC_HERMITE(S0)(controlpointsHandRail11);


    var curveHandRail9 = MAP(curveMappingHandRail9)(domain1D);
    
    var curveHandRail10 = MAP(curveMappingHandRail10)(domain1D);
    
    var curveHandRail11 = MAP(curveMappingHandRail11)(domain1D);
    
    var controlpointsHandRail12 = [[4,-0.7-0.2,0.15+3.3+0.5+2.5+0.1],
                                  [0.4,-0.7-0.2,6.8708+0.3+0.1],
                                  [-2,0,0.5],
                                  [-2,0,0.5]];
    var curveMappingHandRail12 = CUBIC_HERMITE(S0)(controlpointsHandRail12)

    var controlpointsHandRail13 = [[4,-0.7,0.15+3.3+0.5+2.5+0.2],
                                  [0.4,-0.7,6.8708+0.3+0.2],
                                  [-2,0,0.5],
                                  [-2,0,0.5]];
    var curveMappingHandRail13 = CUBIC_HERMITE(S0)(controlpointsHandRail13);

    var curveHandRail12 = MAP(curveMappingHandRail12)(domain1D);
    
    var curveHandRail13 = MAP(curveMappingHandRail13)(domain1D);
    
    var controlpointsHandRail14 = [[4,0,0.15+3.3+0.5+2.5+0.2],
                                  [0.4,0,6.8708+0.3+0.2],
                                  [-2,0,0.5],
                                  [-2,0,0.5]]; 
    var curveMappingHandRail14 = CUBIC_HERMITE(S0)(controlpointsHandRail14);

    var controlpointsHandRail15 = [[6+0.1,-0.7-0.2,0.15+3.3+0.5],
                                [4,-0.7-0.2,0.15+3.3+0.5+2.5+0.1],
                                [0,0,7],
                                [-2,0,0.8]];
    var curveMappingHandRail15 = CUBIC_HERMITE(S0)(controlpointsHandRail15)

    var controlpointsHandRail16 = [[6+0.2,-0.7,0.15+3.3+0.5],
                                [4,-0.7,0.15+3.3+0.5+2.5+0.2],
                                [0,0,7],
                                [-2,0,0.8]];
    var curveMappingHandRail16 = CUBIC_HERMITE(S0)(controlpointsHandRail16);

    var curveHandRail15 = MAP(curveMappingHandRail15)(domain1D);
    
    var curveHandRail16 = MAP(curveMappingHandRail16)(domain1D);
    
    var controlpointsHandRail17 = [[6+0.2,0,0.15+3.3+0.5],
                                [4,0,0.15+3.3+0.5+2.5+0.2],
                                [0,0,7],
                                [-2,0,0.8]];
    var curveMappingHandRail17 = CUBIC_HERMITE(S0)(controlpointsHandRail17);

    var curveHandRail17 = MAP(curveMappingHandRail17)(domain1D);
    
    var controlpointsHandRail18 = [[6-0.3-0.1,-0.7-0.2,0.15+3.3+0.5],
                                  [4,-0.7-0.2,0.15+3.3+0.5+2.5-0.3-0.1],
                                  [0,0,6.5],
                                  [-2,0,0.8]]
    var curveMappingHandRail18 = CUBIC_HERMITE(S0)(controlpointsHandRail18)

    var controlpointsHandRail19 = [[6-0.3-0.2,-0.7,0.15+3.3+0.5],
                                  [4,-0.7,0.15+3.3+0.5+2.5-0.3-0.2],
                                  [0,0,6.5],
                                  [-2,0,0.8]]
    var curveMappingHandRail19 = CUBIC_HERMITE(S0)(controlpointsHandRail19);

    var curveHandRail18 = MAP(curveMappingHandRail18)(domain1D);
    
    var curveHandRail19 = MAP(curveMappingHandRail19)(domain1D);

    var controlpointsHandRail20 = [[6-0.3-0.2,0,0.15+3.3+0.5],
                                  [4,0,0.15+3.3+0.5+2.5-0.3-0.2],
                                  [0,0,6.5],
                                  [-2,0,0.8]]
    var curveMappingHandRail20 = CUBIC_HERMITE(S0)(controlpointsHandRail20);

    var controlpointsHandRail21 = [[5.8-0.3,-0.4,3.95],[6.2,-0.4,3.95]];
    var curveMappingHandRail21 = BEZIER(S0)(controlpointsHandRail21);
    var controlpointsHandRail22 = [[5.8-0.3,0,3.95],[6.2,0,3.95]];
    var curveMappingHandRail22 = BEZIER(S0)(controlpointsHandRail22);

    var controlpointsHandRail23 = [[0.4,-0.7+0.15+0.15-0.3,6.8708+0.3-0.3+0.15+0.15],
                                    [0,0,6.9+0.15+0.15],
                                    [-1.5,0,0.375],
                                    [0,0.5,0]];
    var curveMappingHandRail23 = CUBIC_HERMITE(S0)(controlpointsHandRail23);
    var curveHandRail23 = MAP(curveMappingHandRail23)(domain1D);

    var controlpointsHandRail24 = [[0.4,-0.7+0.15+0.15-0.3-0.2,6.8708+0.3-0.3+0.15+0.15+0.1],
                                    [0,0,6.9+0.15+0.15+0.1],
                                    [-1.8,0,0.375],
                                    [0,0.5,0]];
    var curveMappingHandRail24 = CUBIC_HERMITE(S0)(controlpointsHandRail24);
    var curveHandRail24 = MAP(curveMappingHandRail24)(domain1D);

    var controlpointsHandRail25 = [[0.4,-0.7+0.15+0.15-0.3,6.8708+0.3-0.3+0.15+0.15+0.2],
                                    [0,0,6.9+0.15+0.15+0.2],
                                    [-1.5,0,0.375],
                                    [0,0.5,0]];
    var curveMappingHandRail25 = CUBIC_HERMITE(S0)(controlpointsHandRail25);
    var curveHandRail25 = MAP(curveMappingHandRail25)(domain1D);

    var controlpointsHandRail26 = [[0.4,0,6.8708+0.3],[0,0,6.9+0.3]];
    var curveMappingHandRail26 = BEZIER(S0)(controlpointsHandRail26);
    var curveHandRail26 = MAP(curveMappingHandRail26)(domain1D);

    var controlpointsHandRail27 = [[0.4,0,6.8708+0.3+0.2],[0,0,6.9+0.3+0.2]];
    var curveMappingHandRail27 = BEZIER(S0)(controlpointsHandRail27);
    var curveHandRail27 = MAP(curveMappingHandRail27)(domain1D);

    var controlpointsHandRail28 = [[0.4,-0.7+0.15+0.15-0.3,6.8708+0.3-0.3+0.15+0.15-0.3],
                                    [0,0,6.9+0.15+0.15-0.3],
                                    [-1.5,0,0.375],
                                    [0,0.5,0]];
    var curveMappingHandRail28 = CUBIC_HERMITE(S0)(controlpointsHandRail28);
    var curveHandRail28 = MAP(curveMappingHandRail28)(domain1D);

    var controlpointsHandRail29 = [[0.4,-0.7+0.15+0.15-0.3-0.2,6.8708+0.3-0.3+0.15+0.15-0.1-0.3],
                                    [0,0,6.9+0.15+0.15-0.1-0.3],
                                    [-1.8,0,0.375],
                                    [0,0.5,0]];
    var curveMappingHandRail29 = CUBIC_HERMITE(S0)(controlpointsHandRail29);
    var curveHandRail29 = MAP(curveMappingHandRail29)(domain1D);

    var controlpointsHandRail30 = [[0.4,-0.7+0.15+0.15-0.3,6.8708+0.3-0.3+0.15+0.15-0.2-0.3],
                                    [0,0,6.9+0.15+0.15-0.2-0.3],
                                    [-1.5,0,0.375],
                                    [0,0.5,0]];
    var curveMappingHandRail30 = CUBIC_HERMITE(S0)(controlpointsHandRail30);
    var curveHandRail30 = MAP(curveMappingHandRail30)(domain1D);

    var controlpointsHandRail31 = [[0.4,0,6.8708],[0,0,6.9]];
    var curveMappingHandRail31 = BEZIER(S0)(controlpointsHandRail31);
    var curveHandRail31 = MAP(curveMappingHandRail31)(domain1D);

    var controlpointsHandRail32 = [[0.4,0,6.8708-0.2],[0,0,6.9-0.2]];
    var curveMappingHandRail32 = BEZIER(S0)(controlpointsHandRail32);
    var curveHandRail32= MAP(curveMappingHandRail32)(domain1D);
    
    //Surface Pillow Hand Rail
    var surfaceHandRail1= MAP(BEZIER(S1)([curveMappingHandRail,curveMappingHandRail2]))(domain_surface_hermite)
    var surfaceHandRail2= MAP(BEZIER(S1)([curveMappingHandRail5,curveMappingHandRail6]))(domain_surface_hermite)
    var surfaceHandRail3= MAP(BEZIER(S1)([curveMappingHandRail3,curveMappingHandRail4]))(domain_surface_hermite)
    var surfaceHandRail4= MAP(BEZIER(S1)([curveMappingHandRail7,curveMappingHandRail8]))(domain_surface_hermite)
    var surfaceHandRail5= MAP(BEZIER(S1)([curveMappingHandRail7,curveMappingHandRail9,curveMappingHandRail10]))(domain_surface_hermite)
    var surfaceHandRail6= MAP(BEZIER(S1)([curveMappingHandRail10,curveMappingHandRail11]))(domain_surface_hermite)
    var surfaceHandRail7= MAP(BEZIER(S1)([curveMappingHandRail3,curveMappingHandRail12,curveMappingHandRail13]))(domain_surface_hermite)
    var surfaceHandRail8= MAP(BEZIER(S1)([curveMappingHandRail13,curveMappingHandRail14]))(domain_surface_hermite)
    var surfaceHandRail9= MAP(BEZIER(S1)([curveMappingHandRail11,curveMappingHandRail14]))(domain_surface_hermite)
    var surfaceHandRail10= MAP(BEZIER(S1)([curveMappingHandRail,curveMappingHandRail15,curveMappingHandRail16]))(domain_surface_hermite)
    var surfaceHandRail11= MAP(BEZIER(S1)([curveMappingHandRail16,curveMappingHandRail17]))(domain_surface_hermite)
    var surfaceHandRail12= MAP(BEZIER(S1)([curveMappingHandRail5,curveMappingHandRail18,curveMappingHandRail19]))(domain_surface_hermite)
    var surfaceHandRail13= MAP(BEZIER(S1)([curveMappingHandRail19,curveMappingHandRail20]))(domain_surface_hermite)
    var surfaceHandRail14= MAP(BEZIER(S1)([curveMappingHandRail17,curveMappingHandRail20]))(domain_surface_hermite)
    var surfaceHandRail15= MAP(BEZIER(S1)([curveMappingHandRail21,curveMappingHandRail22]))(domain_surface_hermite)
    var surfaceHandRail16= MAP(BEZIER(S1)([curveMappingHandRail23,curveMappingHandRail24,curveMappingHandRail25]))(domain_surface_hermite)
    var surfaceHandRail17= MAP(BEZIER(S1)([curveMappingHandRail23,curveMappingHandRail26]))(domain_surface_hermite)
    var surfaceHandRail18= MAP(BEZIER(S1)([curveMappingHandRail26,curveMappingHandRail27]))(domain_surface_hermite)
    var surfaceHandRail19= MAP(BEZIER(S1)([curveMappingHandRail25,curveMappingHandRail27]))(domain_surface_hermite)
    var surfaceHandRail20= MAP(BEZIER(S1)([curveMappingHandRail28,curveMappingHandRail29,curveMappingHandRail30]))(domain_surface_hermite)
    var surfaceHandRail20= MAP(BEZIER(S1)([curveMappingHandRail28,curveMappingHandRail31]))(domain_surface_hermite)
    var surfaceHandRail21= MAP(BEZIER(S1)([curveMappingHandRail31,curveMappingHandRail32]))(domain_surface_hermite)
    var surfaceHandRail22= MAP(BEZIER(S1)([curveMappingHandRail30,curveMappingHandRail32]))(domain_surface_hermite)

    var PillowHandRail = STRUCT([COLOR(BLACK)(surfaceHandRail1),COLOR(BLACK)(surfaceHandRail2),
                                COLOR(BLACK)(surfaceHandRail3),COLOR(BLACK)(surfaceHandRail4),
                                COLOR(BLACK)(surfaceHandRail5),COLOR(BLACK)(surfaceHandRail6),
                                COLOR(BLACK)(surfaceHandRail7),COLOR(BLACK)(surfaceHandRail8),
                                COLOR(BLACK)(surfaceHandRail9),COLOR(BLACK)(surfaceHandRail10),
                                COLOR(BLACK)(surfaceHandRail11),COLOR(BLACK)(surfaceHandRail12),
                                COLOR(BLACK)(surfaceHandRail13),COLOR(BLACK)(surfaceHandRail14),
                                COLOR(BLACK)(surfaceHandRail15),COLOR(BLACK)(surfaceHandRail16),
                                COLOR(BLACK)(surfaceHandRail17),COLOR(BLACK)(surfaceHandRail18),
                                COLOR(BLACK)(surfaceHandRail19),COLOR(BLACK)(surfaceHandRail20),
                                COLOR(BLACK)(surfaceHandRail20),COLOR(BLACK)(surfaceHandRail21),
                                COLOR(BLACK)(surfaceHandRail22)]);
    return PillowHandRail;
}

//Lamp Bali
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

var getTubeLamp = function(){
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


//fine lamp bali

//em table
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

var getTubeTable = function(){
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
//fine em table

var BaseChair = getLegBase();
var HandRail = getHandRailSkeleton();
var SupportSeat = getSupportSeat();
var PillowSeat = getPillowSeat();
var SupportBackRest = getSupportBackRest();
var PillowBackRest = getPillowBackRest();
var PillowHandRail = getPillowHandRail();

var getNonConformistChair = function(){
    var NonConformistChair = STRUCT([BaseChair,HandRail,SupportSeat,PillowSeat,SupportBackRest,
                                    PillowBackRest,PillowHandRail])
    return NonConformistChair;
}
 

var Base = T([0,1])([-1,-1])(getBase());
var Bulb = getBulb();
var TubesLamp = getTubeLamp();
var Towels = getTowel();

var getLamp =function(){
  var Lamp =STRUCT([Base,Bulb,TubesLamp,Towels])
  return Lamp;
}



var Panel = getPanel();
var CompleteLeg = T([0,1])([3.175,1.275])(R([0,1])([PI/4])(getLeg()));
var CompleteLeg2 = T([0,1])([3.175,9-1.275])(R([0,1])([-PI/4])(getLeg()));
var CompleteLeg3 = T([0,1])([20-3.175,9-1.275])(R([0,1])([PI+PI/4])(getLeg()));
var CompleteLeg4 = T([0,1])([20-3.175,1.275])(R([0,1])([PI-PI/4])(getLeg()));
var DownPanel = getDownPanel();
var Bolts = getBolts();
var Tubes = getTubeTable();
var Solders = getSolders();

var getEMTable =function(){
  var EMtable =STRUCT([Panel,CompleteLeg,CompleteLeg2,CompleteLeg3,CompleteLeg4,DownPanel,Tubes,Bolts,Solders])
  return EMtable;
}
var floor = T([1,2])([-10,-0.1])(COLOR(LIGHTBROWN)(SIMPLEX_GRID([[50],[50],[0.1]])))

var wall1 = T([1])([-10])(SIMPLEX_GRID([[0.1],[50],[20]]))
var wall2 = T([1])([-10])(SIMPLEX_GRID([[9,-32,9],[-50,0.1],[20]]))
var wall3 = T([1])([-10])(SIMPLEX_GRID([[-9,+32],[-50,0.1],[-15,5]]))

var window1 = T([1])([-10])(COLOR(BLACK)(SIMPLEX_GRID([[-9,+0.4,-10.2,+0.4,-10.2,+0.4,-10,+0.4],[-49.8,0.4],[15]])))
var window2 = T([1])([-10])(COLOR(BLACK)(SIMPLEX_GRID([[-9.4,31.2],[-49.8,0.4],[-14.6,+0.4]])))
var window3 = T([1])([-10])(COLOR([1,2,3,0.2])(SIMPLEX_GRID([[-9.4,+10.2,-0.4,+10.2,-0.4,+10],[-49.9,0.2],[14.6]])))

var EMtable = T([0,1])([15,20])(getEMTable());

var Lamp = T([0,1,2])([15+2,20+2,7.2])(SCALE([0,1,2])([0.8,0.8,0.8])(getLamp()));
var Lamp2 = T([0,1,2])([15+3+13,20+2,7.2])(SCALE([0,1,2])([0.8,0.8,0.8])(getLamp()));

var NonConformistChair =  T([0,1])([15-7,20+4])(R([0,1])([-PI/4])(getNonConformistChair()));
var NonConformistChair2 =  T([0,1])([15+7,20+14])(R([0,1])([-PI/2])(getNonConformistChair()));
var NonConformistChair3 =  T([0,1])([15-7+32,20+9])(R([0,1])([-PI/4-PI/2])(getNonConformistChair()));

var finalRoom = STRUCT([floor,
                        wall1,wall2,wall3,
                        window1,window2,window3,
                        EMtable,
                        Lamp,Lamp2,
                        NonConformistChair,NonConformistChair2,NonConformistChair3])

DRAW(finalRoom);
