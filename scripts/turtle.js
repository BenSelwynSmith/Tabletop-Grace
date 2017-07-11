function gracecode_turtle() {
  lineNumber = 35
var func0 = function(argcv) {
  var curarg = 1;
  var var_angle = arguments[curarg];
  curarg++;
  if (argcv[0] !=  func0.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (drawTurtle)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 36
onSelf = true;
  var call1 = callmethod(this, "initialise", [0]);
  lineNumber = 37
  var string2 = new GraceString("2d");
  var call3 = callmethod(var_canvas,"getContext", [1], string2);
  var var_mctx = call3;
  lineNumber = 37;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_mctx)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'mctx' to be of type Dynamic"))
  lineNumber = 38
  var var_triangleSize = new GraceNum(60);
  lineNumber = 38;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_triangleSize)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'triangleSize' to be of type Dynamic"))
  lineNumber = 39
  lineNumber = 40
  lineNumber = 39
  lineNumber = 40
  lineNumber = 39
  var quotient5 = callmethod(var_angle, "/", [1], new GraceNum(180));
  var prod7 = callmethod(quotient5, "*", [1], var_PI);
  var call8 = callmethod(var_trig,"sin", [1], prod7);
  var prod10 = callmethod(call8, "*", [1], var_triangleSize);
  var quotient12 = callmethod(prod10, "/", [1], new GraceNum(2));
  var opresult14 = callmethod(var_x, "+", [1], quotient12);
  var var_x__39__ = opresult14;
  lineNumber = 39;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_x__39__)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'x'' to be of type Dynamic"))
  lineNumber = 40
  lineNumber = 41
  lineNumber = 40
  lineNumber = 41
  lineNumber = 40
  var quotient16 = callmethod(var_angle, "/", [1], new GraceNum(180));
  var prod18 = callmethod(quotient16, "*", [1], var_PI);
  var call19 = callmethod(var_trig,"cos", [1], prod18);
  var prod21 = callmethod(call19, "*", [1], var_triangleSize);
  var quotient23 = callmethod(prod21, "/", [1], new GraceNum(2));
  var diff25 = callmethod(var_y, "-", [1], quotient23);
  var var_y__39__ = diff25;
  lineNumber = 40;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_y__39__)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'y'' to be of type Dynamic"))
  lineNumber = 41
  lineNumber = 1
  lineNumber = 41
  var call26 = callmethod(var_mctx,"beginPath", [0]);
  lineNumber = 43
  lineNumber = 1
  lineNumber = 42
  var string27 = new GraceString("rgb(0, 128, 0)");
  var call28 = callmethod(var_mctx,"fillStyle:=", [1], string27);
  lineNumber = 44
  lineNumber = 1
  lineNumber = 43
  var call29 = callmethod(var_mctx,"lineWidth:=", [1], new GraceNum(3));
  lineNumber = 44
  var call30 = callmethod(var_mctx,"moveTo", [2], var_x__39__, var_y__39__);
  lineNumber = 45
  var diff32 = callmethod(var_angle, "-", [1], new GraceNum(75));
  var quotient34 = callmethod(diff32, "/", [1], new GraceNum(180));
  var prod36 = callmethod(quotient34, "*", [1], var_PI);
  var call37 = callmethod(var_trig,"cos", [1], prod36);
  var prod39 = callmethod(call37, "*", [1], var_triangleSize);
  var diff41 = callmethod(var_x__39__, "-", [1], prod39);
  lineNumber = 46
  var diff43 = callmethod(var_angle, "-", [1], new GraceNum(75));
  var quotient45 = callmethod(diff43, "/", [1], new GraceNum(180));
  var prod47 = callmethod(quotient45, "*", [1], var_PI);
  var call48 = callmethod(var_trig,"sin", [1], prod47);
  var prod50 = callmethod(call48, "*", [1], var_triangleSize);
  var diff52 = callmethod(var_y__39__, "-", [1], prod50);
  lineNumber = 45
  var call53 = callmethod(var_mctx,"lineTo", [2], diff41, diff52);
  lineNumber = 47
  var opresult55 = callmethod(var_angle, "+", [1], new GraceNum(75));
  var quotient57 = callmethod(opresult55, "/", [1], new GraceNum(180));
  var prod59 = callmethod(quotient57, "*", [1], var_PI);
  var call60 = callmethod(var_trig,"cos", [1], prod59);
  var prod62 = callmethod(call60, "*", [1], var_triangleSize);
  var opresult64 = callmethod(var_x__39__, "+", [1], prod62);
  lineNumber = 48
  var opresult66 = callmethod(var_angle, "+", [1], new GraceNum(75));
  var quotient68 = callmethod(opresult66, "/", [1], new GraceNum(180));
  var prod70 = callmethod(quotient68, "*", [1], var_PI);
  var call71 = callmethod(var_trig,"sin", [1], prod70);
  var prod73 = callmethod(call71, "*", [1], var_triangleSize);
  var opresult75 = callmethod(var_y__39__, "+", [1], prod73);
  lineNumber = 47
  var call76 = callmethod(var_mctx,"lineTo", [2], opresult64, opresult75);
  lineNumber = 49
  var call77 = callmethod(var_mctx,"lineTo", [2], var_x__39__, var_y__39__);
  lineNumber = 50
  lineNumber = 1
  lineNumber = 50
  var call78 = callmethod(var_mctx,"fill", [0]);
  lineNumber = 51
  lineNumber = 1
  lineNumber = 51
  var call79 = callmethod(var_mctx,"closePath", [0]);
  return call79
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func0.paramCounts = [
    1,
];
  func0.variableArities = [
    false,
];
  this.methods["drawTurtle"] = func0;
  lineNumber = 57
var func80 = function(argcv) {
  var curarg = 1;
  var var_dist = arguments[curarg];
  curarg++;
  var var_lineCol = arguments[curarg];
  curarg++;
  var var_lineWidth = arguments[curarg];
  curarg++;
  if (argcv[0] !=  func80.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (move)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 58
onSelf = true;
  var call81 = callmethod(this, "initialise", [0]);
  lineNumber = 59
  var var_angle = var_turtleAngle;
  lineNumber = 59;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_angle)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'angle' to be of type Dynamic"))
  lineNumber = 60
  lineNumber = 61
  lineNumber = 60
  var quotient83 = callmethod(var_angle, "/", [1], new GraceNum(180));
  var prod85 = callmethod(quotient83, "*", [1], var_PI);
  var call86 = callmethod(var_trig,"cos", [1], prod85);
  var prod88 = callmethod(call86, "*", [1], var_dist);
  var var_y__39__ = prod88;
  lineNumber = 60;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_y__39__)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'y'' to be of type Dynamic"))
  lineNumber = 61
  lineNumber = 62
  lineNumber = 61
  var quotient90 = callmethod(var_angle, "/", [1], new GraceNum(180));
  var prod92 = callmethod(quotient90, "*", [1], var_PI);
  var call93 = callmethod(var_trig,"sin", [1], prod92);
  var prod95 = callmethod(call93, "*", [1], var_dist);
  var var_x__39__ = prod95;
  lineNumber = 61;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_x__39__)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'x'' to be of type Dynamic"))
  lineNumber = 62
  var var_startX = var_x;
  lineNumber = 62;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_startX)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'startX' to be of type Dynamic"))
  lineNumber = 63
  var var_startY = var_y;
  lineNumber = 63;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_startY)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'startY' to be of type Dynamic"))
  lineNumber = 64
  var var_startAngle = var_turtleAngle;
  lineNumber = 64;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_startAngle)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'startAngle' to be of type Dynamic"))
  lineNumber = 66
  lineNumber = 65
  var diff97 = callmethod(var_y, "-", [1], var_y__39__);
  var_y = diff97;
  lineNumber = 67
  lineNumber = 66
  var opresult99 = callmethod(var_x, "+", [1], var_x__39__);
  var_x = opresult99;
  lineNumber = 67
  lineNumber = 68
  lineNumber = 67
  lineNumber = 1
  lineNumber = 67
  var call100 = callmethod(var_stages,"size", [0]);
  var diff102 = callmethod(call100, "-", [1], new GraceNum(1));
  var var_stageN = diff102;
  lineNumber = 67;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_stageN)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'stageN' to be of type Dynamic"))
  lineNumber = 68
  var string103 = new GraceString("2d");
  var call104 = callmethod(var_canvas,"getContext", [1], string103);
  var var_mctx = call104;
  lineNumber = 68;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_mctx)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'mctx' to be of type Dynamic"))
  lineNumber = 70
  var opresult106 = callmethod(new GraceNum(1), "..", [1], var_dist);
  var block107 = Grace_allocObject();
  block107.methods["apply"] = function() {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.real.apply(this.receiver, args);
  }
  block107.methods["applyIndirectly"] = function(argcv, a) {
    return this.real.apply(this.receiver, a._value);
  }
  block107.methods["outer"] = function() {
    return callmethod(this.receiver, 'outer', [0]);
  }
  block107.methods["match"] = GraceBlock_match;
  block107.receiver = this;
  block107.className = 'block<turtle:70>';
  block107.real = function(
var_i
) {
  sourceObject = this;
  lineNumber = 71
  var block108 = Grace_allocObject();
  block108.methods["apply"] = function() {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.real.apply(this.receiver, args);
  }
  block108.methods["applyIndirectly"] = function(argcv, a) {
    return this.real.apply(this.receiver, a._value);
  }
  block108.methods["outer"] = function() {
    return callmethod(this.receiver, 'outer', [0]);
  }
  block108.methods["match"] = GraceBlock_match;
  block108.receiver = this;
  block108.className = 'block<turtle:71>';
  block108.real = function(
) {
  sourceObject = this;
  lineNumber = 72
  lineNumber = 73
  lineNumber = 72
  var quotient110 = callmethod(var_angle, "/", [1], new GraceNum(180));
  var prod112 = callmethod(quotient110, "*", [1], var_PI);
  var call113 = callmethod(var_trig,"cos", [1], prod112);
  var prod115 = callmethod(call113, "*", [1], var_i);
  var var_y__39____39__ = prod115;
  lineNumber = 72;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_y__39____39__)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'y''' to be of type Dynamic"))
  lineNumber = 73
  lineNumber = 74
  lineNumber = 73
  var quotient117 = callmethod(var_angle, "/", [1], new GraceNum(180));
  var prod119 = callmethod(quotient117, "*", [1], var_PI);
  var call120 = callmethod(var_trig,"sin", [1], prod119);
  var prod122 = callmethod(call120, "*", [1], var_i);
  var var_x__39____39__ = prod122;
  lineNumber = 73;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_x__39____39__)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'x''' to be of type Dynamic"))
  lineNumber = 74
  lineNumber = 1
  lineNumber = 74
  var call123 = callmethod(var_mctx,"beginPath", [0]);
  lineNumber = 76
  lineNumber = 1
  lineNumber = 75
  var string124 = new GraceString("rgb(");
  lineNumber = 1
  lineNumber = 75
  var call125 = callmethod(var_lineCol,"r", [0]);
  var opresult127 = callmethod(string124, "++", [1], call125);
  var string128 = new GraceString(", ");
  var opresult130 = callmethod(opresult127, "++", [1], string128);
  lineNumber = 1
  lineNumber = 75
  var call131 = callmethod(var_lineCol,"g", [0]);
  var opresult133 = callmethod(opresult130, "++", [1], call131);
  var string134 = new GraceString(", ");
  var opresult136 = callmethod(opresult133, "++", [1], string134);
  lineNumber = 1
  lineNumber = 75
  var call137 = callmethod(var_lineCol,"b", [0]);
  var opresult139 = callmethod(opresult136, "++", [1], call137);
  var string140 = new GraceString(")");
  var opresult142 = callmethod(opresult139, "++", [1], string140);
  var call143 = callmethod(var_mctx,"strokeStyle:=", [1], opresult142);
  lineNumber = 77
  lineNumber = 1
  lineNumber = 76
  var call144 = callmethod(var_mctx,"lineWidth:=", [1], var_lineWidth);
  lineNumber = 77
  var call145 = callmethod(var_mctx,"moveTo", [2], var_startX, var_startY);
  lineNumber = 79
  lineNumber = 78
  var diff147 = callmethod(var_startY, "-", [1], var_y__39____39__);
  var_y = diff147;
  lineNumber = 80
  lineNumber = 79
  var opresult149 = callmethod(var_startX, "+", [1], var_x__39____39__);
  var_x = opresult149;
  lineNumber = 80
  if (Grace_isTrue(var_drawingEnabled)) {
  lineNumber = 81
  var call151 = callmethod(var_mctx,"lineTo", [2], var_x, var_y);
  lineNumber = 82
  lineNumber = 1
  lineNumber = 82
  var call152 = callmethod(var_mctx,"stroke", [0]);
  var if150 = call152;
}
  lineNumber = 85
  lineNumber = 84
  var_turtleAngle = var_startAngle;
  return var_startAngle;
};
  lineNumber = 71
  var call153 = callmethod(var_steps,"push", [1], block108);
  return call153;
};
  var call154 = callmethod(Grace_prelude,"for()do", [1, 1], opresult106, block107);
  lineNumber = 87
  var block155 = Grace_allocObject();
  block155.methods["apply"] = function() {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.real.apply(this.receiver, args);
  }
  block155.methods["applyIndirectly"] = function(argcv, a) {
    return this.real.apply(this.receiver, a._value);
  }
  block155.methods["outer"] = function() {
    return callmethod(this.receiver, 'outer', [0]);
  }
  block155.methods["match"] = GraceBlock_match;
  block155.receiver = this;
  block155.className = 'block<turtle:87>';
  block155.real = function(
) {
  sourceObject = this;
  lineNumber = 88
  lineNumber = 89
  lineNumber = 88
  var quotient157 = callmethod(var_angle, "/", [1], new GraceNum(180));
  var prod159 = callmethod(quotient157, "*", [1], var_PI);
  var call160 = callmethod(var_trig,"cos", [1], prod159);
  var prod162 = callmethod(call160, "*", [1], var_dist);
  var var_y__39____39__ = prod162;
  lineNumber = 88;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_y__39____39__)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'y''' to be of type Dynamic"))
  lineNumber = 89
  lineNumber = 90
  lineNumber = 89
  var quotient164 = callmethod(var_angle, "/", [1], new GraceNum(180));
  var prod166 = callmethod(quotient164, "*", [1], var_PI);
  var call167 = callmethod(var_trig,"sin", [1], prod166);
  var prod169 = callmethod(call167, "*", [1], var_dist);
  var var_x__39____39__ = prod169;
  lineNumber = 89;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_x__39____39__)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'x''' to be of type Dynamic"))
  lineNumber = 90
  lineNumber = 1
  lineNumber = 90
  var call170 = callmethod(var_ctx,"beginPath", [0]);
  lineNumber = 92
  lineNumber = 1
  lineNumber = 91
  var string171 = new GraceString("rgb(");
  lineNumber = 1
  lineNumber = 91
  var call172 = callmethod(var_lineCol,"r", [0]);
  var opresult174 = callmethod(string171, "++", [1], call172);
  var string175 = new GraceString(", ");
  var opresult177 = callmethod(opresult174, "++", [1], string175);
  lineNumber = 1
  lineNumber = 91
  var call178 = callmethod(var_lineCol,"g", [0]);
  var opresult180 = callmethod(opresult177, "++", [1], call178);
  var string181 = new GraceString(", ");
  var opresult183 = callmethod(opresult180, "++", [1], string181);
  lineNumber = 1
  lineNumber = 91
  var call184 = callmethod(var_lineCol,"b", [0]);
  var opresult186 = callmethod(opresult183, "++", [1], call184);
  var string187 = new GraceString(")");
  var opresult189 = callmethod(opresult186, "++", [1], string187);
  var call190 = callmethod(var_ctx,"strokeStyle:=", [1], opresult189);
  lineNumber = 93
  lineNumber = 1
  lineNumber = 92
  var call191 = callmethod(var_ctx,"lineWidth:=", [1], var_lineWidth);
  lineNumber = 93
  var call192 = callmethod(var_ctx,"moveTo", [2], var_startX, var_startY);
  lineNumber = 95
  lineNumber = 94
  var diff194 = callmethod(var_startY, "-", [1], var_y__39____39__);
  var_y = diff194;
  lineNumber = 96
  lineNumber = 95
  var opresult196 = callmethod(var_startX, "+", [1], var_x__39____39__);
  var_x = opresult196;
  lineNumber = 96
  if (Grace_isTrue(var_drawingEnabled)) {
  lineNumber = 97
  var call198 = callmethod(var_ctx,"lineTo", [2], var_x, var_y);
  lineNumber = 98
  lineNumber = 1
  lineNumber = 98
  var call199 = callmethod(var_ctx,"stroke", [0]);
  var if197 = call199;
}
  lineNumber = 101
  lineNumber = 100
  var_turtleAngle = var_startAngle;
  return var_startAngle;
};
  lineNumber = 87
  var call200 = callmethod(var_steps,"push", [1], block155);
  return call200
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func80.paramCounts = [
    3,
];
  func80.variableArities = [
    false,
];
  this.methods["move"] = func80;
  lineNumber = 103
var func201 = function(argcv) {
  var curarg = 1;
  var var_ang = arguments[curarg];
  curarg++;
  if (argcv[0] !=  func201.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (turnRight)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 104
onSelf = true;
  var call202 = callmethod(this, "initialise", [0]);
  lineNumber = 105
  var var_startX = var_x;
  lineNumber = 105;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_startX)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'startX' to be of type Dynamic"))
  lineNumber = 106
  var var_startY = var_y;
  lineNumber = 106;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_startY)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'startY' to be of type Dynamic"))
  lineNumber = 107
  var var_startAngle = var_turtleAngle;
  lineNumber = 107;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_startAngle)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'startAngle' to be of type Dynamic"))
  lineNumber = 108
  var opresult204 = callmethod(new GraceNum(0), "..", [1], var_ang);
  var block205 = Grace_allocObject();
  block205.methods["apply"] = function() {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.real.apply(this.receiver, args);
  }
  block205.methods["applyIndirectly"] = function(argcv, a) {
    return this.real.apply(this.receiver, a._value);
  }
  block205.methods["outer"] = function() {
    return callmethod(this.receiver, 'outer', [0]);
  }
  block205.methods["match"] = GraceBlock_match;
  block205.receiver = this;
  block205.className = 'block<turtle:108>';
  block205.real = function(
var_i
) {
  sourceObject = this;
  lineNumber = 109
  var block206 = Grace_allocObject();
  block206.methods["apply"] = function() {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.real.apply(this.receiver, args);
  }
  block206.methods["applyIndirectly"] = function(argcv, a) {
    return this.real.apply(this.receiver, a._value);
  }
  block206.methods["outer"] = function() {
    return callmethod(this.receiver, 'outer', [0]);
  }
  block206.methods["match"] = GraceBlock_match;
  block206.receiver = this;
  block206.className = 'block<turtle:109>';
  block206.real = function(
) {
  sourceObject = this;
  lineNumber = 111
  lineNumber = 110
  var_x = var_startX;
  lineNumber = 112
  lineNumber = 111
  var_y = var_startY;
  lineNumber = 113
  lineNumber = 112
  var opresult208 = callmethod(var_startAngle, "+", [1], var_i);
  var_turtleAngle = opresult208;
  return opresult208;
};
  lineNumber = 109
  var call209 = callmethod(var_steps,"push", [1], block206);
  return call209;
};
  var call210 = callmethod(Grace_prelude,"for()do", [1, 1], opresult204, block205);
  lineNumber = 115
  var block211 = Grace_allocObject();
  block211.methods["apply"] = function() {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.real.apply(this.receiver, args);
  }
  block211.methods["applyIndirectly"] = function(argcv, a) {
    return this.real.apply(this.receiver, a._value);
  }
  block211.methods["outer"] = function() {
    return callmethod(this.receiver, 'outer', [0]);
  }
  block211.methods["match"] = GraceBlock_match;
  block211.receiver = this;
  block211.className = 'block<turtle:115>';
  block211.real = function(
) {
  sourceObject = this;
  lineNumber = 117
  lineNumber = 116
  var_x = var_startX;
  lineNumber = 118
  lineNumber = 117
  var_y = var_startY;
  lineNumber = 119
  lineNumber = 118
  var opresult213 = callmethod(var_startAngle, "+", [1], var_ang);
  var_turtleAngle = opresult213;
  return opresult213;
};
  lineNumber = 115
  var call214 = callmethod(var_steps,"push", [1], block211);
  lineNumber = 121
  lineNumber = 120
  var opresult216 = callmethod(var_turtleAngle, "+", [1], var_ang);
  var_turtleAngle = opresult216;
  return opresult216
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func201.paramCounts = [
    1,
];
  func201.variableArities = [
    false,
];
  this.methods["turnRight"] = func201;
  lineNumber = 122
var func217 = function(argcv) {
  var curarg = 1;
  var var_ang = arguments[curarg];
  curarg++;
  if (argcv[0] !=  func217.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (turnLeft)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 123
onSelf = true;
  var call218 = callmethod(this, "initialise", [0]);
  lineNumber = 124
  var var_startX = var_x;
  lineNumber = 124;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_startX)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'startX' to be of type Dynamic"))
  lineNumber = 125
  var var_startY = var_y;
  lineNumber = 125;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_startY)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'startY' to be of type Dynamic"))
  lineNumber = 126
  var var_startAngle = var_turtleAngle;
  lineNumber = 126;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_startAngle)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'startAngle' to be of type Dynamic"))
  lineNumber = 127
  var opresult220 = callmethod(new GraceNum(0), "..", [1], var_ang);
  var block221 = Grace_allocObject();
  block221.methods["apply"] = function() {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.real.apply(this.receiver, args);
  }
  block221.methods["applyIndirectly"] = function(argcv, a) {
    return this.real.apply(this.receiver, a._value);
  }
  block221.methods["outer"] = function() {
    return callmethod(this.receiver, 'outer', [0]);
  }
  block221.methods["match"] = GraceBlock_match;
  block221.receiver = this;
  block221.className = 'block<turtle:127>';
  block221.real = function(
var_i
) {
  sourceObject = this;
  lineNumber = 128
  var block222 = Grace_allocObject();
  block222.methods["apply"] = function() {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.real.apply(this.receiver, args);
  }
  block222.methods["applyIndirectly"] = function(argcv, a) {
    return this.real.apply(this.receiver, a._value);
  }
  block222.methods["outer"] = function() {
    return callmethod(this.receiver, 'outer', [0]);
  }
  block222.methods["match"] = GraceBlock_match;
  block222.receiver = this;
  block222.className = 'block<turtle:128>';
  block222.real = function(
) {
  sourceObject = this;
  lineNumber = 130
  lineNumber = 129
  var_x = var_startX;
  lineNumber = 131
  lineNumber = 130
  var_y = var_startY;
  lineNumber = 132
  lineNumber = 131
  var diff224 = callmethod(var_startAngle, "-", [1], var_i);
  var_turtleAngle = diff224;
  return diff224;
};
  lineNumber = 128
  var call225 = callmethod(var_steps,"push", [1], block222);
  return call225;
};
  var call226 = callmethod(Grace_prelude,"for()do", [1, 1], opresult220, block221);
  lineNumber = 134
  var block227 = Grace_allocObject();
  block227.methods["apply"] = function() {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.real.apply(this.receiver, args);
  }
  block227.methods["applyIndirectly"] = function(argcv, a) {
    return this.real.apply(this.receiver, a._value);
  }
  block227.methods["outer"] = function() {
    return callmethod(this.receiver, 'outer', [0]);
  }
  block227.methods["match"] = GraceBlock_match;
  block227.receiver = this;
  block227.className = 'block<turtle:134>';
  block227.real = function(
) {
  sourceObject = this;
  lineNumber = 136
  lineNumber = 135
  var_x = var_startX;
  lineNumber = 137
  lineNumber = 136
  var_y = var_startY;
  lineNumber = 138
  lineNumber = 137
  var diff229 = callmethod(var_startAngle, "-", [1], var_ang);
  var_turtleAngle = diff229;
  return diff229;
};
  lineNumber = 134
  var call230 = callmethod(var_steps,"push", [1], block227);
  lineNumber = 140
  lineNumber = 139
  var diff232 = callmethod(var_turtleAngle, "-", [1], var_ang);
  var_turtleAngle = diff232;
  return diff232
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func217.paramCounts = [
    1,
];
  func217.variableArities = [
    false,
];
  this.methods["turnLeft"] = func217;
  lineNumber = 141
var func233 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func233.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (penUp)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 142
onSelf = true;
  var call234 = callmethod(this, "initialise", [0]);
  lineNumber = 143
  var block235 = Grace_allocObject();
  block235.methods["apply"] = function() {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.real.apply(this.receiver, args);
  }
  block235.methods["applyIndirectly"] = function(argcv, a) {
    return this.real.apply(this.receiver, a._value);
  }
  block235.methods["outer"] = function() {
    return callmethod(this.receiver, 'outer', [0]);
  }
  block235.methods["match"] = GraceBlock_match;
  block235.receiver = this;
  block235.className = 'block<turtle:143>';
  block235.real = function(
) {
  sourceObject = this;
  lineNumber = 145
  lineNumber = 144
  var bool236 = new GraceBoolean(false)
  var_drawingEnabled = bool236;
  return bool236;
};
  lineNumber = 143
  var call237 = callmethod(var_steps,"push", [1], block235);
  return call237
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func233.paramCounts = [
    0,
];
  func233.variableArities = [
    false,
];
  this.methods["penUp"] = func233;
  lineNumber = 147
var func238 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func238.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (penDown)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 148
onSelf = true;
  var call239 = callmethod(this, "initialise", [0]);
  lineNumber = 149
  var block240 = Grace_allocObject();
  block240.methods["apply"] = function() {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.real.apply(this.receiver, args);
  }
  block240.methods["applyIndirectly"] = function(argcv, a) {
    return this.real.apply(this.receiver, a._value);
  }
  block240.methods["outer"] = function() {
    return callmethod(this.receiver, 'outer', [0]);
  }
  block240.methods["match"] = GraceBlock_match;
  block240.receiver = this;
  block240.className = 'block<turtle:149>';
  block240.real = function(
) {
  sourceObject = this;
  lineNumber = 151
  lineNumber = 150
  var bool241 = new GraceBoolean(true)
  var_drawingEnabled = bool241;
  return bool241;
};
  lineNumber = 149
  var call242 = callmethod(var_steps,"push", [1], block240);
  return call242
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func238.paramCounts = [
    0,
];
  func238.variableArities = [
    false,
];
  this.methods["penDown"] = func238;
  lineNumber = 154
var func243 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func243.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (initialise)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 155
  if (Grace_isTrue(var_initialised)) {
  lineNumber = 157
  lineNumber = 156
  var bool245 = new GraceBoolean(false)
  return bool245
  var if244 = undefined;
}
  lineNumber = 159
  lineNumber = 158
  lineNumber = 1
  lineNumber = 158
  var call246 = callmethod(var_dom,"document", [0]);
  var_document = call246;
  lineNumber = 160
  lineNumber = 159
  var bool247 = new GraceBoolean(true)
  var_initialised = bool247;
  lineNumber = 161
  lineNumber = 160
  lineNumber = 1
  lineNumber = 160
  lineNumber = 1
  lineNumber = 160
  var call248 = callmethod(var_dom,"window", [0]);
  var call249 = callmethod(call248,"Math", [0]);
  var_trig = call249;
  lineNumber = 161
  var string250 = new GraceString("standard-canvas");
  var call251 = callmethod(var_document,"getElementById", [1], string250);
  var_canvas = call251;
  lineNumber = 162
  var string252 = new GraceString("2d");
  var call253 = callmethod(var_canvas,"getContext", [1], string252);
  var_ctx = call253;
  lineNumber = 164
  lineNumber = 1
  lineNumber = 163
  var call254 = callmethod(var_ctx,"lineWidth:=", [1], new GraceNum(1));
  lineNumber = 165
  lineNumber = 1
  lineNumber = 164
  var string255 = new GraceString("white");
  var call256 = callmethod(var_ctx,"fillStyle:=", [1], string255);
  lineNumber = 165
  lineNumber = 1
  lineNumber = 165
  var call257 = callmethod(var_canvas,"width", [0]);
  lineNumber = 1
  lineNumber = 165
  var call258 = callmethod(var_canvas,"height", [0]);
  var call259 = callmethod(var_ctx,"fillRect", [4], new GraceNum(0), new GraceNum(0), call257, call258);
  lineNumber = 167
  lineNumber = 1
  lineNumber = 166
  var string260 = new GraceString("black");
  var call261 = callmethod(var_ctx,"strokeStyle:=", [1], string260);
  lineNumber = 167
  lineNumber = 1
  lineNumber = 167
  var call262 = callmethod(var_canvas,"width", [0]);
  lineNumber = 1
  lineNumber = 167
  var call263 = callmethod(var_canvas,"height", [0]);
  var call264 = callmethod(var_ctx,"rect", [4], new GraceNum(0), new GraceNum(0), call262, call263);
  lineNumber = 168
  lineNumber = 1
  lineNumber = 168
  var call265 = callmethod(var_ctx,"stroke", [0]);
  return call265
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func243.paramCounts = [
    0,
];
  func243.variableArities = [
    false,
];
  this.methods["initialise"] = func243;
  lineNumber = 170
var func266 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func266.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (start)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 171
onSelf = true;
  var call267 = callmethod(this, "initialise", [0]);
  lineNumber = 175
  var string268 = new GraceString("canvas");
  lineNumber = 1
  lineNumber = 175
  var call269 = callmethod(var_dom,"document", [0]);
  var call270 = callmethod(call269,"createElement", [1], string268);
  var_backingCanvas = call270;
  lineNumber = 177
  lineNumber = 1
  lineNumber = 176
  lineNumber = 1
  lineNumber = 176
  var call271 = callmethod(var_canvas,"height", [0]);
  var call272 = callmethod(var_backingCanvas,"height:=", [1], call271);
  lineNumber = 178
  lineNumber = 1
  lineNumber = 177
  lineNumber = 1
  lineNumber = 177
  var call273 = callmethod(var_canvas,"width", [0]);
  var call274 = callmethod(var_backingCanvas,"width:=", [1], call273);
  lineNumber = 178
  var string275 = new GraceString("2d");
  var call276 = callmethod(var_backingCanvas,"getContext", [1], string275);
  var_ctx = call276;
  lineNumber = 179
  var string277 = new GraceString("2d");
  var call278 = callmethod(var_canvas,"getContext", [1], string277);
  var var_mctx = call278;
  lineNumber = 179;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_mctx)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'mctx' to be of type Dynamic"))
  lineNumber = 180
  var block279 = Grace_allocObject();
  block279.methods["apply"] = function() {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.real.apply(this.receiver, args);
  }
  block279.methods["applyIndirectly"] = function(argcv, a) {
    return this.real.apply(this.receiver, a._value);
  }
  block279.methods["outer"] = function() {
    return callmethod(this.receiver, 'outer', [0]);
  }
  block279.methods["match"] = GraceBlock_match;
  block279.receiver = this;
  block279.className = 'block<turtle:180>';
  block279.real = function(
var_step
) {
  sourceObject = this;
  lineNumber = 182
  lineNumber = 1
  lineNumber = 181
  var string280 = new GraceString("white");
  var call281 = callmethod(var_mctx,"fillStyle:=", [1], string280);
  lineNumber = 182
  lineNumber = 1
  lineNumber = 182
  var call282 = callmethod(var_canvas,"width", [0]);
  lineNumber = 1
  lineNumber = 182
  var call283 = callmethod(var_canvas,"height", [0]);
  var call284 = callmethod(var_mctx,"fillRect", [4], new GraceNum(0), new GraceNum(0), call282, call283);
  lineNumber = 184
  lineNumber = 183
  var_x = new GraceNum(100);
  lineNumber = 185
  lineNumber = 184
  var_y = new GraceNum(400);
  lineNumber = 186
  lineNumber = 185
  var_turtleAngle = new GraceNum(0);
  lineNumber = 186
  lineNumber = 1
  lineNumber = 186
  var call285 = callmethod(var_step,"apply", [0]);
  lineNumber = 187
  var call286 = callmethod(var_mctx,"drawImage", [3], var_backingCanvas, new GraceNum(0), new GraceNum(0));
  lineNumber = 188
onSelf = true;
  var call287 = callmethod(this, "drawTurtle", [1], var_turtleAngle);
  return call287;
};
  lineNumber = 180
  var call288 = callmethod(var_dom,"for()waiting()do", [1, 1, 1], var_steps, var_delay, block279);
  return call288
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func266.paramCounts = [
    0,
];
  func266.variableArities = [
    false,
];
  this.methods["start"] = func266;
  lineNumber = 2
// Import of dom
  if (typeof gracecode_dom == 'undefined')
    throw new GraceExceptionPacket(RuntimeErrorObject, 
      new GraceString('could not find module dom'));
  var var_dom = do_import("dom", gracecode_dom);
  lineNumber = 5
// Import of mgcollections
  if (typeof gracecode_mgcollections == 'undefined')
    throw new GraceExceptionPacket(RuntimeErrorObject, 
      new GraceString('could not find module mgcollections'));
  var var_collections = do_import("mgcollections", gracecode_mgcollections);
  var var_document;
  lineNumber = 1
var func289 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func289.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (document)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 5
  return var_document
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func289.paramCounts = [
    0,
];
  func289.variableArities = [
    false,
];
  this.methods["document"] = func289;
  lineNumber = 1
var func290 = function(argcv) {
  var curarg = 1;
  var var___95__var__95__assign__95__tmp = arguments[curarg];
  curarg++;
  if (argcv[0] !=  func290.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (document:=)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  var_document = var___95__var__95__assign__95__tmp;
  return var___95__var__95__assign__95__tmp
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func290.paramCounts = [
    1,
];
  func290.variableArities = [
    false,
];
  this.methods["document:="] = func290;
  lineNumber = 6
  var var_canvas;
  lineNumber = 1
var func291 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func291.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (canvas)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 6
  return var_canvas
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func291.paramCounts = [
    0,
];
  func291.variableArities = [
    false,
];
  this.methods["canvas"] = func291;
  lineNumber = 1
var func292 = function(argcv) {
  var curarg = 1;
  var var___95__var__95__assign__95__tmp = arguments[curarg];
  curarg++;
  if (argcv[0] !=  func292.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (canvas:=)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  var_canvas = var___95__var__95__assign__95__tmp;
  return var___95__var__95__assign__95__tmp
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func292.paramCounts = [
    1,
];
  func292.variableArities = [
    false,
];
  this.methods["canvas:="] = func292;
  lineNumber = 7
  var var_ctx;
  lineNumber = 1
var func293 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func293.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (ctx)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 7
  return var_ctx
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func293.paramCounts = [
    0,
];
  func293.variableArities = [
    false,
];
  this.methods["ctx"] = func293;
  lineNumber = 1
var func294 = function(argcv) {
  var curarg = 1;
  var var___95__var__95__assign__95__tmp = arguments[curarg];
  curarg++;
  if (argcv[0] !=  func294.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (ctx:=)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  var_ctx = var___95__var__95__assign__95__tmp;
  return var___95__var__95__assign__95__tmp
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func294.paramCounts = [
    1,
];
  func294.variableArities = [
    false,
];
  this.methods["ctx:="] = func294;
  lineNumber = 8
  var var_trig;
  lineNumber = 1
var func295 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func295.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (trig)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 8
  return var_trig
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func295.paramCounts = [
    0,
];
  func295.variableArities = [
    false,
];
  this.methods["trig"] = func295;
  lineNumber = 1
var func296 = function(argcv) {
  var curarg = 1;
  var var___95__var__95__assign__95__tmp = arguments[curarg];
  curarg++;
  if (argcv[0] !=  func296.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (trig:=)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  var_trig = var___95__var__95__assign__95__tmp;
  return var___95__var__95__assign__95__tmp
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func296.paramCounts = [
    1,
];
  func296.variableArities = [
    false,
];
  this.methods["trig:="] = func296;
  lineNumber = 8
  lineNumber = 10
  lineNumber = 1
var func297 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func297.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (colour)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 10
  return var_colour
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func297.paramCounts = [
    0,
];
  func297.variableArities = [
    false,
];
  this.methods["colour"] = func297;
  lineNumber = 1
  var obj298 = Grace_allocObject();
  obj298.outer = this;
    var reader_turtle_outer299 = function() {
    return this.outer;
  }
  obj298.methods["outer"] = reader_turtle_outer299;
function obj_init_298() {
  var origSuperDepth = superDepth;
  superDepth = obj298;
var func300 = function(argcv) {
  var curarg = 1;
  var var_r__39__ = arguments[curarg];
  curarg++;
  if (argcv[0] !=  func300.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (r)"));
  var var_g__39__ = arguments[curarg];
  curarg++;
  if (argcv[1] !=  func300.paramCounts[1])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 2 (g)"));
  var var_b__39__ = arguments[curarg];
  curarg++;
  if (argcv[2] !=  func300.paramCounts[2])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 3 (b)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  var obj301 = Grace_allocObject();
  obj301.outer = this;
    var reader_turtle_outer302 = function() {
    return this.outer;
  }
  obj301.methods["outer"] = reader_turtle_outer302;
function obj_init_301() {
  var origSuperDepth = superDepth;
  superDepth = obj301;
  sourceObject = obj301;
  lineNumber = 11
  obj301.data["r"] = var_r__39__;
    var reader_turtle_r303 = function() {
    return this.data["r"];
  }
  reader_turtle_r303.def = true;
  obj301.methods["r"] = reader_turtle_r303;
  lineNumber = 11;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_r__39__)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'r' to be of type Dynamic"))
  sourceObject = obj301;
  lineNumber = 12
  obj301.data["g"] = var_g__39__;
    var reader_turtle_g304 = function() {
    return this.data["g"];
  }
  reader_turtle_g304.def = true;
  obj301.methods["g"] = reader_turtle_g304;
  lineNumber = 12;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_g__39__)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'g' to be of type Dynamic"))
  sourceObject = obj301;
  lineNumber = 13
  obj301.data["b"] = var_b__39__;
    var reader_turtle_b305 = function() {
    return this.data["b"];
  }
  reader_turtle_b305.def = true;
  obj301.methods["b"] = reader_turtle_b305;
  lineNumber = 13;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_b__39__)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'b' to be of type Dynamic"))
  superDepth = origSuperDepth;
}
obj_init_301.apply(obj301, []);
  return obj301
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func300.paramCounts = [
    1,
    1,
    1,
];
  func300.variableArities = [
    false,
    false,
    false,
];
  obj298.methods["r()g()b"] = func300;
var func306 = function(argcv) {
  var curarg = 1;
  var var_r__39__ = arguments[curarg];
  curarg++;
  var var_g__39__ = arguments[curarg];
  curarg++;
  var var_b__39__ = arguments[curarg];
  curarg++;
  var inheritingObject = arguments[curarg++];
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  var obj307 = Grace_allocObject();
  var inho307 = inheritingObject;
  while (inho307.superobj) inho307 = inho307.superobj;
  inho307.superobj = obj307;
  obj307.data = inheritingObject.data;
  obj307.outer = this;
    var reader_turtle_outer308 = function() {
    return this.outer;
  }
  obj307.methods["outer"] = reader_turtle_outer308;
function obj_init_307() {
  var origSuperDepth = superDepth;
  superDepth = obj307;
  sourceObject = obj307;
  lineNumber = 11
  obj307.data["r"] = var_r__39__;
    var reader_turtle_r309 = function() {
    return this.data["r"];
  }
  reader_turtle_r309.def = true;
  obj307.methods["r"] = reader_turtle_r309;
  lineNumber = 11;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_r__39__)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'r' to be of type Dynamic"))
  sourceObject = obj307;
  lineNumber = 12
  obj307.data["g"] = var_g__39__;
    var reader_turtle_g310 = function() {
    return this.data["g"];
  }
  reader_turtle_g310.def = true;
  obj307.methods["g"] = reader_turtle_g310;
  lineNumber = 12;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_g__39__)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'g' to be of type Dynamic"))
  sourceObject = obj307;
  lineNumber = 13
  obj307.data["b"] = var_b__39__;
    var reader_turtle_b311 = function() {
    return this.data["b"];
  }
  reader_turtle_b311.def = true;
  obj307.methods["b"] = reader_turtle_b311;
  lineNumber = 13;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_b__39__)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'b' to be of type Dynamic"))
  superDepth = origSuperDepth;
}
obj_init_307.apply(inheritingObject, []);
  return obj307
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  obj298.methods["r()g()b()object"] = func306;
  sourceObject = obj298;
  superDepth = origSuperDepth;
}
obj_init_298.apply(obj298, []);
  var var_colour = obj298;
  lineNumber = 15
  var call312 = callmethod(var_colour,"r()g()b", [1, 1, 1], new GraceNum(0), new GraceNum(0), new GraceNum(0));
  var var_black = call312;
  lineNumber = 1
var func313 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func313.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (black)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 15
  return var_black
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func313.paramCounts = [
    0,
];
  func313.variableArities = [
    false,
];
  this.methods["black"] = func313;
  lineNumber = 15;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_black)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'black' to be of type Dynamic"))
  lineNumber = 16
  var call314 = callmethod(var_colour,"r()g()b", [1, 1, 1], new GraceNum(0), new GraceNum(0), new GraceNum(255));
  var var_blue = call314;
  lineNumber = 1
var func315 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func315.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (blue)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 16
  return var_blue
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func315.paramCounts = [
    0,
];
  func315.variableArities = [
    false,
];
  this.methods["blue"] = func315;
  lineNumber = 16;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_blue)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'blue' to be of type Dynamic"))
  lineNumber = 17
  var call316 = callmethod(var_colour,"r()g()b", [1, 1, 1], new GraceNum(0), new GraceNum(255), new GraceNum(0));
  var var_green = call316;
  lineNumber = 1
var func317 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func317.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (green)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 17
  return var_green
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func317.paramCounts = [
    0,
];
  func317.variableArities = [
    false,
];
  this.methods["green"] = func317;
  lineNumber = 17;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_green)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'green' to be of type Dynamic"))
  lineNumber = 18
  var call318 = callmethod(var_colour,"r()g()b", [1, 1, 1], new GraceNum(255), new GraceNum(0), new GraceNum(0));
  var var_red = call318;
  lineNumber = 1
var func319 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func319.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (red)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 18
  return var_red
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func319.paramCounts = [
    0,
];
  func319.variableArities = [
    false,
];
  this.methods["red"] = func319;
  lineNumber = 18;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_red)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'red' to be of type Dynamic"))
  lineNumber = 20
  var var_x = new GraceNum(100);
  lineNumber = 1
var func320 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func320.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (x)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 20
  return var_x
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func320.paramCounts = [
    0,
];
  func320.variableArities = [
    false,
];
  this.methods["x"] = func320;
  lineNumber = 1
var func321 = function(argcv) {
  var curarg = 1;
  var var___95__var__95__assign__95__tmp = arguments[curarg];
  curarg++;
  if (argcv[0] !=  func321.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (x:=)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  var_x = var___95__var__95__assign__95__tmp;
  return var___95__var__95__assign__95__tmp
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func321.paramCounts = [
    1,
];
  func321.variableArities = [
    false,
];
  this.methods["x:="] = func321;
  lineNumber = 20;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_x)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of var 'x' to be of type Dynamic"))
  lineNumber = 21
  var var_y = new GraceNum(400);
  lineNumber = 1
var func322 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func322.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (y)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 21
  return var_y
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func322.paramCounts = [
    0,
];
  func322.variableArities = [
    false,
];
  this.methods["y"] = func322;
  lineNumber = 1
var func323 = function(argcv) {
  var curarg = 1;
  var var___95__var__95__assign__95__tmp = arguments[curarg];
  curarg++;
  if (argcv[0] !=  func323.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (y:=)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  var_y = var___95__var__95__assign__95__tmp;
  return var___95__var__95__assign__95__tmp
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func323.paramCounts = [
    1,
];
  func323.variableArities = [
    false,
];
  this.methods["y:="] = func323;
  lineNumber = 21;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_y)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of var 'y' to be of type Dynamic"))
  lineNumber = 22
  var bool324 = new GraceBoolean(false)
  var var_started = bool324;
  lineNumber = 1
var func325 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func325.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (started)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 22
  return var_started
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func325.paramCounts = [
    0,
];
  func325.variableArities = [
    false,
];
  this.methods["started"] = func325;
  lineNumber = 1
var func326 = function(argcv) {
  var curarg = 1;
  var var___95__var__95__assign__95__tmp = arguments[curarg];
  curarg++;
  if (argcv[0] !=  func326.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (started:=)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  var_started = var___95__var__95__assign__95__tmp;
  return var___95__var__95__assign__95__tmp
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func326.paramCounts = [
    1,
];
  func326.variableArities = [
    false,
];
  this.methods["started:="] = func326;
  lineNumber = 22;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_started)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of var 'started' to be of type Dynamic"))
  lineNumber = 23
  lineNumber = 24
  lineNumber = 23
  var call327 = callmethod(new GraceNum(1),"prefix-", [0]);
  var var_maxActionsDrawn = call327;
  lineNumber = 1
var func328 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func328.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (maxActionsDrawn)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 23
  return var_maxActionsDrawn
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func328.paramCounts = [
    0,
];
  func328.variableArities = [
    false,
];
  this.methods["maxActionsDrawn"] = func328;
  lineNumber = 1
var func329 = function(argcv) {
  var curarg = 1;
  var var___95__var__95__assign__95__tmp = arguments[curarg];
  curarg++;
  if (argcv[0] !=  func329.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (maxActionsDrawn:=)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  var_maxActionsDrawn = var___95__var__95__assign__95__tmp;
  return var___95__var__95__assign__95__tmp
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func329.paramCounts = [
    1,
];
  func329.variableArities = [
    false,
];
  this.methods["maxActionsDrawn:="] = func329;
  lineNumber = 23;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_maxActionsDrawn)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of var 'maxActionsDrawn' to be of type Dynamic"))
  lineNumber = 24
  var var_delay = new GraceNum(1);
  lineNumber = 1
var func330 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func330.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (delay)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 24
  return var_delay
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func330.paramCounts = [
    0,
];
  func330.variableArities = [
    false,
];
  this.methods["delay"] = func330;
  lineNumber = 1
var func331 = function(argcv) {
  var curarg = 1;
  var var___95__var__95__assign__95__tmp = arguments[curarg];
  curarg++;
  if (argcv[0] !=  func331.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (delay:=)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  var_delay = var___95__var__95__assign__95__tmp;
  return var___95__var__95__assign__95__tmp
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func331.paramCounts = [
    1,
];
  func331.variableArities = [
    false,
];
  this.methods["delay:="] = func331;
  lineNumber = 24;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_delay)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of var 'delay' to be of type Dynamic"))
  lineNumber = 26
  var var_turtleAngle = new GraceNum(0);
  lineNumber = 1
var func332 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func332.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (turtleAngle)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 26
  return var_turtleAngle
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func332.paramCounts = [
    0,
];
  func332.variableArities = [
    false,
];
  this.methods["turtleAngle"] = func332;
  lineNumber = 1
var func333 = function(argcv) {
  var curarg = 1;
  var var___95__var__95__assign__95__tmp = arguments[curarg];
  curarg++;
  if (argcv[0] !=  func333.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (turtleAngle:=)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  var_turtleAngle = var___95__var__95__assign__95__tmp;
  return var___95__var__95__assign__95__tmp
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func333.paramCounts = [
    1,
];
  func333.variableArities = [
    false,
];
  this.methods["turtleAngle:="] = func333;
  lineNumber = 26;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_turtleAngle)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of var 'turtleAngle' to be of type Dynamic"))
  lineNumber = 29
  lineNumber = 1
  lineNumber = 29
  lineNumber = 1
  lineNumber = 29
  var call334 = callmethod(var_collections,"list", [0]);
  var call335 = callmethod(call334,"new", [0]);
  var var_steps = call335;
  lineNumber = 1
var func336 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func336.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (steps)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 29
  return var_steps
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func336.paramCounts = [
    0,
];
  func336.variableArities = [
    false,
];
  this.methods["steps"] = func336;
  lineNumber = 29;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_steps)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'steps' to be of type Dynamic"))
  lineNumber = 31
  lineNumber = 1
  lineNumber = 31
  lineNumber = 1
  lineNumber = 31
  var call337 = callmethod(var_collections,"list", [0]);
  var call338 = callmethod(call337,"new", [0]);
  var var_stages = call338;
  lineNumber = 1
var func339 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func339.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (stages)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 31
  return var_stages
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func339.paramCounts = [
    0,
];
  func339.variableArities = [
    false,
];
  this.methods["stages"] = func339;
  lineNumber = 31;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_stages)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'stages' to be of type Dynamic"))
  lineNumber = 33
  var var_PI = new GraceNum(3.14159);
  lineNumber = 1
var func340 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func340.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (PI)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 33
  return var_PI
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func340.paramCounts = [
    0,
];
  func340.variableArities = [
    false,
];
  this.methods["PI"] = func340;
  lineNumber = 33;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_PI)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of def 'PI' to be of type Dynamic"))
  lineNumber = 35
  lineNumber = 54
  var var_backingCanvas;
  lineNumber = 1
var func341 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func341.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (backingCanvas)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 54
  return var_backingCanvas
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func341.paramCounts = [
    0,
];
  func341.variableArities = [
    false,
];
  this.methods["backingCanvas"] = func341;
  lineNumber = 1
var func342 = function(argcv) {
  var curarg = 1;
  var var___95__var__95__assign__95__tmp = arguments[curarg];
  curarg++;
  if (argcv[0] !=  func342.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (backingCanvas:=)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  var_backingCanvas = var___95__var__95__assign__95__tmp;
  return var___95__var__95__assign__95__tmp
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func342.paramCounts = [
    1,
];
  func342.variableArities = [
    false,
];
  this.methods["backingCanvas:="] = func342;
  lineNumber = 55
  var bool343 = new GraceBoolean(true)
  var var_drawingEnabled = bool343;
  lineNumber = 1
var func344 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func344.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (drawingEnabled)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 55
  return var_drawingEnabled
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func344.paramCounts = [
    0,
];
  func344.variableArities = [
    false,
];
  this.methods["drawingEnabled"] = func344;
  lineNumber = 1
var func345 = function(argcv) {
  var curarg = 1;
  var var___95__var__95__assign__95__tmp = arguments[curarg];
  curarg++;
  if (argcv[0] !=  func345.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (drawingEnabled:=)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  var_drawingEnabled = var___95__var__95__assign__95__tmp;
  return var___95__var__95__assign__95__tmp
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func345.paramCounts = [
    1,
];
  func345.variableArities = [
    false,
];
  this.methods["drawingEnabled:="] = func345;
  lineNumber = 55;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_drawingEnabled)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of var 'drawingEnabled' to be of type Dynamic"))
  lineNumber = 153
  var bool346 = new GraceBoolean(false)
  var var_initialised = bool346;
  lineNumber = 1
var func347 = function(argcv) {
  var curarg = 1;
  if (argcv[0] !=  func347.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (initialised)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  lineNumber = 153
  return var_initialised
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func347.paramCounts = [
    0,
];
  func347.variableArities = [
    false,
];
  this.methods["initialised"] = func347;
  lineNumber = 1
var func348 = function(argcv) {
  var curarg = 1;
  var var___95__var__95__assign__95__tmp = arguments[curarg];
  curarg++;
  if (argcv[0] !=  func348.paramCounts[0])
      callmethod(RuntimeErrorObject, "raise", [1], new GraceString("wrong number of arguments for part 1 (initialised:=)"));
  var returnTarget = invocationCount;
  invocationCount++;
  try {
  var_initialised = var___95__var__95__assign__95__tmp;
  return var___95__var__95__assign__95__tmp
  } catch(e) {
    if ((e.exctype == 'return') && (e.target == returnTarget)) {
      return e.returnvalue;
    } else {
      throw e;
    }
  }
}
  func348.paramCounts = [
    1,
];
  func348.variableArities = [
    false,
];
  this.methods["initialised:="] = func348;
  lineNumber = 153;
  if (!Grace_isTrue(callmethod(var_Dynamic, "match",
    [1], var_initialised)))
      throw new GraceExceptionPacket(TypeErrorObject,
            new GraceString("expected "
            + "initial value of var 'initialised' to be of type Dynamic"))
  return this;
}
if (gctCache)
  gctCache['turtle'] = "modules:\n mgcollections\nclasses:\n colour\nconstructors-of:colour:\n r()g()b\npath:\n turtle\nmethods-of:colour.r()g()b:\n r\n b\n g\npublic:\n document\n document:=\n canvas\n canvas:=\n ctx\n ctx:=\n trig\n trig:=\n colour\n black\n blue\n green\n red\n x\n x:=\n y\n y:=\n started\n started:=\n maxActionsDrawn\n maxActionsDrawn:=\n delay\n delay:=\n turtleAngle\n turtleAngle:=\n steps\n stages\n PI\n drawTurtle\n backingCanvas\n backingCanvas:=\n drawingEnabled\n drawingEnabled:=\n move\n turnRight\n turnLeft\n penUp\n penDown\n initialised\n initialised:=\n initialise\n start\nconfidential:\nfresh-methods:\n";
