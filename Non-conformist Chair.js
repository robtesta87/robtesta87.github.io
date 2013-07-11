/*
Roberto Testa
Matricola Number:465341
Computational Graphics
Object: Eileen Gray's Non Conformist Chair
*/

//domain
var domain = DOMAIN([[0,2*PI]])([36]);
var domain2 = PROD1x1([INTERVALS(2*PI)(50), INTERVALS(1)(50)])
var domain1D = INTERVALS(1)(20);
var domain_surface_hermite = PROD1x1([INTERVALS(1)(14),INTERVALS(1)(14)]);

//COLORS
var BLACK = [25/255, 25/255, 25/255];

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

var NonConformistChair = getNonConformistChair();

DRAW(NonConformistChair); 