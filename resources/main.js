(function (w, d, wO, dO, $) {
    'use strict';

    // ---------------------------------------------------------------------//
    // Starting Globals, which are common to all.
    // This also includes debugging related module, make sure to erase them
    // in release version.
    // ---------------------------------------------------------------------//

    var DEBUGGING = true,
        DEBUGGER,
        DEBUGGER_DOM,
        DEBUGGER_MESSAGE_COUNT_DOM,
        DEBUGGER_FPS_DOM,
        MESSAGE_SUCCESS = 0,
        MESSAGE_INFORMATION = 1,
        MESSAGE_ERROR = 2,
        DEBUGGING_CANVAS,
        DEBUGGING_CANVAS_CONTEXT,
        PreviousMessage,
        DebugMessageCount = 0,
        LastFPSUpdate = 0,
        FPS = 0,
    // Ending Debugging related variables.
        GAME_NAME = 'Ninja Ball',
        PI = Math.PI,
        PI_BY_TWO = PI / 2,
        THREE_PI_BY_TWO = 3 * PI / 2,
        TWO_PI = 2 * PI,
        PI_BY_ONE_EIGHTY = PI / 180,
        ONE_EIGHTY_BY_PI = 180 / PI,
        PI_ROUNDED,
        PI_BY_TWO_ROUNDED,
        THREE_PI_BY_TWO_ROUNDED,
        TWO_PI_ROUNDED,
        PI_BY_ONE_EIGHTY_ROUNDED,
        ONE_EIGHTY_BY_PI_ROUNDED,
        SLOWER_TIME_DELTA = 10,
        DEFAULT_TIME_DELTA = 20,
        FASTER_TIME_DELTA = 30,
        GRAVITY = 1,
        CONVERSION_FACTOR = 1,
        MINIMUM_VELOCITY = 0.02,
        MAXIMUM_VELOCITY = 0.2,
        MAXIMUM_VELOCITY_FASTER = 0.3,
        VELOCITY_STEP = 0.03,
        VELOCITY_STEP_FASTER = 0.04,
        GEOMETRY_SIZE = 0,
        GEOMETRY_POINT = 1,
        GEOMETRY_LINE = 2,
        GEOMETRY_SEGMENT = 3,
        GEOMETRY_VECTOR = 4,
        WINDOW_WIDTH = w.innerWidth,
        WINDOW_HEIGHT = w.innerHeight,
        HALF_WINDOW_WIDTH = WINDOW_WIDTH / 2,
        HALF_WINDOW_HEIGHT = WINDOW_HEIGHT / 2,
        RESOLUTION_WIDTH = 1280,
        RESOLUTION_HEIGHT = 720,
        HALF_RESOLUTION_WIDTH = RESOLUTION_WIDTH / 2,
        HALF_RESOLUTION_HEIGHT = RESOLUTION_HEIGHT / 2,
        ASPECT_RATIO = RESOLUTION_WIDTH / RESOLUTION_HEIGHT,
        CANVAS_WIDTH = WINDOW_WIDTH,
        CANVAS_HEIGHT = WINDOW_HEIGHT,
        HALF_CANVAS_WIDTH = HALF_WINDOW_WIDTH,
        HALF_CANVAS_HEIGHT = HALF_WINDOW_HEIGHT,
        PERFORM_SCALING = true,
        STATIC_CANVAS,
        STATIC_CANVAS_CONTEXT,
        DYNAMIC_CANVAS,
        DYNAMIC_CANVAS_CONTEXT,
        FRAME_DOM,
        URL,
    // Defining local references to the important Math functions.
        abs = Math.abs,
        sin = Math.sin,
        cos = Math.cos,
        atan = Math.atan,
        atan2 = Math.atan2,
        sqrt = Math.sqrt,
        ceil = Math.ceil,
        floor = Math.floor,
        round = Math.round,
        random = Math.random,
        sign = Math.sign,
    // Defining local references to the Menu Elements.
        DYNAMIC_STYLES_DOM,
        RESOURCES_HOLDER_DOM,
        STRINGS_HOLDER_DOM,
        MENU_FRAME_DOM,
        SPLASH_SCREEN_FRAME_DOM,
        SPLASH_SCREEN_TITLE_DOM,
        SPLASH_SCREEN_STAR_ONE_DOM,
        SPLASH_SCREEN_STAR_TWO_DOM,
        MAIN_MENU_FRAME_DOM,
        MAIN_MENU_TITLE_DOM,
    // Text related references.
        BounceEasing = [500, 20],
        FadeIn = 0,
        FadeInEach = 1,
        FadeInScaleUp = 2,
        FadeInScaleDown = 3,
        FadeInEachScaleUp = 4,
        FadeInEachScaleDown = 5,
        FadeInTop = 6,
        FadeInBottom = 7,
        FadeInLeft = 8,
        FadeInRight = 9,
        FadeInEachTop = 10,
        FadeInEachBottom = 11,
        FadeInEachLeft = 12,
        FadeInEachLeftWave = 13,
        FadeInEachRight = 14,
        FadeInEachRightWave = 15,
        FadeInEachRotateX = 16,
        FadeInEachRotateY = 17,
        FadeInEachRotateZ = 18,
        FadeInEachScaleUpRotateX = 19,
        FadeInEachScaleUpRotateY = 20,
        FadeInEachScaleUpRotateZ = 21,
        FadeInEachScaleDownRotateX = 22,
        FadeInEachScaleDownRotateY = 23,
        FadeInEachScaleDownRotateZ = 24,
        FadeOut = 100,
        FadeOutEach = 101,
        FadeOutScaleUp = 102,
        FadeOutScaleDown = 103,
        FadeOutEachScaleUp = 104,
        FadeOutEachScaleDown = 105,
        FadeOutTop = 106,
        FadeOutBottom = 107,
        FadeOutLeft = 108,
        FadeOutRight = 109,
        FadeOutEachLeft = 110,
        FadeOutEachLeftWave = 111,
        FadeOutEachRight = 112,
        FadeOutEachRightWave = 113,
        FadeOutEachTop = 114,
        FadeOutEachBottom = 115,
        FadeOutEachRotateX = 116,
        FadeOutEachRotateY = 117,
        FadeOutEachRotateZ = 118,
        FadeOutEachScaleUpRotateX = 119,
        FadeOutEachScaleUpRotateY = 120,
        FadeOutEachScaleUpRotateZ = 121,
        FadeOutEachScaleDownRotateX = 122,
        FadeOutEachScaleDownRotateY = 123,
        FadeOutEachScaleDownRotateZ = 124,
        EachScaleUpDown = 200,
        EachScaleDownUp = 201,
        EachMoveUpDown = 202,
        EachMoveDownUp = 203,
        EachMoveLeftRight = 204,
        EachMoveRightLeft = 205,
        EachWaveLeftRight = 206,
        EachWaveLeftRightRotateX = 207,
        EachWaveLeftRightRotateY = 208,
        EachWaveLeftRightRotateZ = 209,
        EachWaveRightLeft = 210,
        EachWaveRightLeftRotateX = 211,
        EachWaveRightLeftRotateY = 212,
        EachWaveRightLeftRotateZ = 213,
        EachRotateX = 214,
        EachRotateY = 215,
        EachRotateZ = 216,
        ScaleUp = 300,
        ScaleDown = 301,
        CurrentMenu = 0,
        PreviousMenu = 0,
        MaxMenuOption = 0,
        CurrentMenuOption = 1,
        PreviousMenuOption = 0;

    // Important rounding hack to be defined first, :)

    /**
     * @return {number}
     */
    function Round(number) {
        return number | 0;
    }

    /**
     * @return {number}
     */
    function RoundUpper(number) {
        return (number + 1) | 0;
    }

    /**
     * @return {number}
     */
    function RoundDecimal(number) {
        return Round(number * 100) / 100;
    }

    function Exit(message) {
        throw new Error('Exit :: ' + message);
    }

    $.fn.CSS = function (css, after) {
        var Element = $(this);
        Element.velocity(css, {
            duration: 0,
            complete: after
        });
        return Element;
    };

    function InitializeGlobals() {

        // Rounding up required variables.

        PI_ROUNDED = RoundDecimal(PI);
        PI_BY_TWO_ROUNDED = RoundDecimal(PI_BY_TWO);
        THREE_PI_BY_TWO_ROUNDED = RoundDecimal(THREE_PI_BY_TWO);
        TWO_PI_ROUNDED = RoundDecimal(TWO_PI);
        PI_BY_ONE_EIGHTY_ROUNDED = RoundDecimal(PI_BY_ONE_EIGHTY);
        ONE_EIGHTY_BY_PI_ROUNDED = RoundDecimal(ONE_EIGHTY_BY_PI);

        // Getting our root URL.

        URL = w.location.href;

        // Calculating to scale canvas size.

        if (PERFORM_SCALING) {
            var widthScaling = false,
                heightScaling = false;
            if (CANVAS_WIDTH > CANVAS_HEIGHT) {
                if (CANVAS_WIDTH >= RESOLUTION_WIDTH) {
                    widthScaling = true;
                    if ((ASPECT_RATIO * CANVAS_HEIGHT) > CANVAS_WIDTH) {
                        widthScaling = false;
                        heightScaling = true;
                    }
                } else {
                    heightScaling = true;
                    if ((CANVAS_WIDTH / ASPECT_RATIO) > CANVAS_HEIGHT) {
                        heightScaling = false;
                        widthScaling = true;
                    }
                }
            } else if (CANVAS_WIDTH < CANVAS_HEIGHT) {
                heightScaling = true;
                if ((CANVAS_WIDTH / ASPECT_RATIO) > CANVAS_HEIGHT) {
                    heightScaling = false;
                    widthScaling = true;
                }
            } else {
                if (RESOLUTION_WIDTH > RESOLUTION_HEIGHT) {
                    heightScaling = true;
                } else if (RESOLUTION_WIDTH < RESOLUTION_HEIGHT) {
                    widthScaling = true;
                }
            }
            if (widthScaling) {
                CANVAS_WIDTH = Round(ASPECT_RATIO * CANVAS_HEIGHT);
                HALF_CANVAS_WIDTH = CANVAS_WIDTH / 2;
            }
            if (heightScaling) {
                CANVAS_HEIGHT = Round(CANVAS_WIDTH / ASPECT_RATIO);
                HALF_CANVAS_HEIGHT = CANVAS_HEIGHT / 2;
            }
        }

        // Caching Frame DOM and applying size.

        FRAME_DOM = $('#GameFrame', d).css({
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            top: HALF_WINDOW_HEIGHT - HALF_CANVAS_HEIGHT,
            left: HALF_WINDOW_WIDTH - HALF_CANVAS_WIDTH
        });

        // Caching and applying Dimensions and Positions to the Menu Element DOMs.

        DYNAMIC_STYLES_DOM = $('#DynamicStyles', d);
        RESOURCES_HOLDER_DOM = $('#Resources', d);
        STRINGS_HOLDER_DOM = $('#Strings', d).css({
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT
        });
        MENU_FRAME_DOM = $('#MenuFrame', d).css({
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT
        });
        SPLASH_SCREEN_FRAME_DOM = $('#SplashScreenFrame', d).css({
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT
        });
        SPLASH_SCREEN_TITLE_DOM = SPLASH_SCREEN_FRAME_DOM.find('#Title');
        SPLASH_SCREEN_STAR_ONE_DOM = SPLASH_SCREEN_FRAME_DOM.find('#NinjaStarOne');
        SPLASH_SCREEN_STAR_TWO_DOM = SPLASH_SCREEN_FRAME_DOM.find('#NinjaStarTwo');
        MAIN_MENU_FRAME_DOM = $('#MainMenuFrame', d).css({
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT
        });
        MAIN_MENU_TITLE_DOM = MAIN_MENU_FRAME_DOM.find('#Title');

        // Creating Static, Dynamic, and Menu canvases and caching them respectively.

        STATIC_CANVAS = $('<canvas id="' + GAME_NAME + '-Static" class="Static"><!-- Static canvas is used to display static sprites which do not change with time to increase performance greatly. --></canvas>').appendTo(FRAME_DOM).css({
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT
        })[0];
        DYNAMIC_CANVAS = $('<canvas id="' + GAME_NAME + '-Dynamic" class="Dynamic"><!-- Dynamic canvas is used to display dynamic sprites which change with time, this is real resource hogger. --></canvas>').appendTo(FRAME_DOM).css({
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT
        })[0];
        STATIC_CANVAS.width = RESOLUTION_WIDTH;
        STATIC_CANVAS.height = RESOLUTION_HEIGHT;
        DYNAMIC_CANVAS.width = RESOLUTION_WIDTH;
        DYNAMIC_CANVAS.height = RESOLUTION_HEIGHT;
        STATIC_CANVAS_CONTEXT = STATIC_CANVAS.getContext('2d');
        DYNAMIC_CANVAS_CONTEXT = DYNAMIC_CANVAS.getContext('2d');

        // Loading Debugger

        if (DEBUGGING) {
            DEBUGGER = $('#Debugger').css('display', 'block');

            //Caching Debugging element.

            DEBUGGER_DOM = DEBUGGER.find('#Messages ul');
            DEBUGGER_MESSAGE_COUNT_DOM = DEBUGGER.find('#MessageCount span');
            DEBUGGER_FPS_DOM = DEBUGGER.find('#FPS span');
            DEBUGGER.css({
                width: (WINDOW_WIDTH - 10),
                height: '18px'
            }).find('#Toggler').bind('click', function () {
                if (DEBUGGER.css('height') === '18px') {
                    $(this).html('[ Close ]');
                    DEBUGGER.css('height', (WINDOW_HEIGHT - 10));
                } else {
                    $(this).html('[ Open ]');
                    DEBUGGER.css('height', '18px');
                }
            });

            // Creating and caching debugging canvas.

            DEBUGGING_CANVAS = $('<canvas id="' + GAME_NAME + '-Debugger" class="Debugger"><!-- Debugger canvas is used to display visual debugging elements. [Note: This should be removed in release version.] --></canvas>').appendTo(FRAME_DOM).css({
                width: CANVAS_WIDTH,
                height: CANVAS_HEIGHT
            })[0];
            DEBUGGING_CANVAS.width = RESOLUTION_WIDTH;
            DEBUGGING_CANVAS.height = RESOLUTION_HEIGHT;
            DEBUGGING_CANVAS_CONTEXT = DEBUGGING_CANVAS.getContext('2d');
            DEBUGGING_CANVAS_CONTEXT.strokeStyle = '#ffffff';
            DEBUGGING_CANVAS_CONTEXT.lineWidth = 2;

        } else {
            $('#Debugger').remove();
        }

    }

    // Some basic Debugging function go here.

    function Debug(message, type) {
        if (DEBUGGING) {
            if (PreviousMessage !== message) {
                PreviousMessage = message;
                switch (type) {
                    case MESSAGE_SUCCESS:
                        DEBUGGER_DOM.append(['<li class="DebugMessageSuccess">', message, '</li>'].join(''));
                        DebugMessageCount++;
                        break;
                    case MESSAGE_INFORMATION:
                        DEBUGGER_DOM.append(['<li class="DebugMessageInformation">', message, '</li>'].join(''));
                        DebugMessageCount++;
                        break;
                    case MESSAGE_ERROR:
                        DEBUGGER_DOM.append(['<li class="DebugMessageError">', message, '</li>'].join(''));
                        DebugMessageCount++;
                        break;
                }
            } else {
                var LastMessageDOM = DEBUGGER_DOM.find('li:last');
                if (LastMessageDOM.find('#Repeated').length === 0) {
                    LastMessageDOM.append('<span id="Repeated" style="color:#ffffff"> [Repeated]<span>');
                }
                DebugMessageCount++;
            }
            DEBUGGER_MESSAGE_COUNT_DOM.html(DebugMessageCount);
        }
    }

    function UpdateFPS(timestamp) {
        if (DEBUGGING) {
            if (timestamp >= LastFPSUpdate + 1000) {
                DEBUGGER_FPS_DOM.html(Round(FPS));
                LastFPSUpdate = timestamp;
                FPS = 0;
            } else {
                FPS++;
            }
        }
    }

    // Basic functions are declared here.

    /**
     * @return {boolean}
     */
    function OppositeSign(a, b) {
        a = a === 0 ? 1 : a;
        b = b === 0 ? 1 : b;
        return a > 0 ? b < 0 : b > 0;
    }

    /**
     * @return {number}
     */
    function Degree(radian) {
        return radian * ONE_EIGHTY_BY_PI;
    }

    // Basic objects are declared here along with there respective functions.

    function Size(width, height) {
        return {
            Type: GEOMETRY_SIZE,
            Width: width,
            Height: height
        };
    }

    function Point(x, y) {
        return {
            Type: GEOMETRY_POINT,
            X: x,
            Y: y
        };
    }

    function ShiftOrigin(point, originX, originY) {
        point.X -= originX;
        point.Y -= originY;
    }

    function RotatePoint(point, angle) {
        var x = point.X,
            y = point.Y,
            Sin = sin(angle),
            Cos = cos(angle);
        point.X = x * Cos - y * Sin;
        point.Y = x * Sin + y * Cos;
    }

    function Line(m, c) {
        return {
            Type: GEOMETRY_LINE,
            M: m,
            C: c
        };
    }

    function Segment(p, q) {
        return {
            Type: GEOMETRY_SEGMENT,
            P: p,
            Q: q
        };
    }

    function Vector(a, b) {
        return {
            Type: GEOMETRY_VECTOR,
            A: a,
            B: b
        };
    }

    function Clone(geometry) {
        switch (geometry.Type) {
            case GEOMETRY_SIZE:
                return Size(geometry.Width, geometry.Height);
                break;
            case GEOMETRY_POINT:
                return Point(geometry.X, geometry.Y);
                break;
            case GEOMETRY_LINE:
                return Line(geometry.M, geometry.C);
                break;
            case GEOMETRY_SEGMENT:
                return Segment(geometry.P, geometry.Q);
                break;
            case GEOMETRY_VECTOR:
                return Vector(geometry.A, geometry.B);
                break;
        }
    }

    function Slope(geometry) {
        switch (geometry.Type) {
            case GEOMETRY_LINE:
                return geometry.M;
                break;
            case GEOMETRY_SEGMENT:
                var qx = geometry.Q.X,
                    qy = geometry.Q.Y,
                    px = geometry.P.X,
                    py = geometry.P.Y;
                return qy - py === 0 ? 0 : qx - px === 0 ? Infinity : (qy - py) / (qx - px);
                break;
            case GEOMETRY_VECTOR:
                var a = geometry.A,
                    b = geometry.B;
                return b === 0 ? 0 : a === 0 ? Infinity : b / a;
                break;
        }
    }

    /**
     * @return {number}
     */
    function Angle(geometry) {
        return atan(Slope(geometry));
    }

    /**
     * @return {number}
     */
    function AngleOfSegment(segment) {
        var P = segment.P,
            Q = segment.Q;
        return atan2(Q.Y - P.Y, Q.X - P.X);
    }

    /**
     * @return {number}
     */
    function Magnitude(geometry, squared) {
        squared = squared || false;
        switch (geometry.Type) {
            case GEOMETRY_LINE:
                return Infinity;
                break;
            case GEOMETRY_SEGMENT:
                var qx = geometry.Q.X,
                    qy = geometry.Q.Y,
                    px = geometry.P.X,
                    py = geometry.P.Y,
                    X = qx - px,
                    Y = qy - py;
                if (qy === py) {
                    return squared ? X * X : abs(X);
                } else if (qx === px) {
                    return squared ? Y * Y : abs(Y);
                } else {
                    return squared ? Y * Y + X * X : RoundDecimal(sqrt(Y * Y + X * X));
                }
                break;
            case GEOMETRY_VECTOR:
                var a = geometry.A,
                    b = geometry.B;
                if (b === 0) {
                    return squared ? b * b : abs(b);
                } else if (a === 0) {
                    return squared ? a * a : abs(a);
                } else {
                    return squared ? a * a + b * b : RoundDecimal(sqrt(a * a + b * b));
                }
                break;
        }
    }

    /**
     * @return {number}
     */
    function Evaluate(geometry, point, slope) {
        slope = slope || Slope(geometry);
        var x = point.X,
            y = point.Y;
        switch (geometry.Type) {
            case GEOMETRY_LINE:
                var c = geometry.C;
                switch (slope) {
                    case 0:
                        return y - c;
                        break;
                    case Infinity:
                        return x - c;
                        break;
                    default:
                        return y - slope * x - c;
                        break;
                }
                break;
            case GEOMETRY_SEGMENT:
                var px = geometry.P.X,
                    py = geometry.P.Y
                switch (slope) {
                    case 0:
                        return y - py;
                        break;
                    case Infinity:
                        return x - px;
                        break;
                    default:
                        return y - py - slope * (x - px);
                        break;
                }
                break;
        }
    }

    /**
     * @return {number}
     */
    function DistanceFrom(geometry, point, slope, squared, forced) {
        squared = squared || false;
        forced = forced || false;
        var x = point.X,
            y = point.Y,
            X,
            Y;
        switch (geometry.Type) {
            case GEOMETRY_POINT:
                X = geometry.X - x;
                Y = geometry.Y - y;
                return Y === 0 ? squared ? X * X : X : X === 0 ? squared ? Y * Y : Y : squared ? X * X + Y * Y : RoundDecimal(sqrt(X * X + Y * Y));
                break;
            case GEOMETRY_LINE:
                slope = slope || Slope(geometry);
                var c = geometry.C;
                switch (slope) {
                    case 0:
                        Y = y - c;
                        return squared ? forced ? Y * Y : Y : Y;
                        break;
                    case Infinity:
                        X = x - c;
                        return squared ? forced ? X * X : X : X;
                        break;
                    default:
                        X = y - (slope * slope) * x - c;
                        return RoundDecimal(squared ? (X * X) / (1 + (slope * slope)) : X / sqrt(1 + (slope * slope)));
                        break;
                }
                break;
            case GEOMETRY_SEGMENT:
                slope = slope || Slope(geometry);
                var px = geometry.P.X,
                    py = geometry.P.Y;
                switch (slope) {
                    case 0:
                        Y = y - py;
                        return squared ? forced ? Y * Y : Y : Y;
                        break;
                    case Infinity:
                        X = x - px;
                        return squared ? forced ? X * X : X : X;
                        break;
                    default:
                        X = y - py - slope * (x - px);
                        return RoundDecimal(squared ? X * X / (1 + (slope * slope)) : X / sqrt(1 + (slope * slope)));
                        break;
                }
                break;
        }
    }

    function ToVector(geometry) {
        var A, B;
        switch (geometry.Type) {
            case GEOMETRY_LINE:
                // Returning an unit vector along the line.
                // Not to be used extensively, since expensive square root function is called here.
                var m = geometry.M;
                A = RoundDecimal(1 / sqrt(1 + m * m));
                B = m * A;
                break;
            case GEOMETRY_SEGMENT:
                A = geometry.Q.X - geometry.P.X;
                B = geometry.Q.Y - geometry.P.Y;
                break;
        }
        return Vector(A, B);
    }

    function ToLine(geometry) {
        var M, C;
        switch (geometry.Type) {
            case GEOMETRY_SEGMENT:
                M = Slope(geometry);
                C = geometry.P.Y - M * geometry.P.X;
                break;
            case GEOMETRY_VECTOR:
                M = Slope(geometry);
                C = 0;
                break;
        }
        return Line(M, C);
    }

    /**
     * @return {boolean}
     */
    function PointInSegment(segment, point) {
        var DistanceP = abs(DistanceFrom(segment.P, point)),
            DistanceQ = abs(DistanceFrom(segment.Q, point)),
            SegmentMagnitude = ceil(Magnitude(segment));
        return ceil(DistanceP + DistanceQ) == SegmentMagnitude;
    }

    function SegmentProjection(baseSegment, projectingSegment, baseSegmentSlope) {
        var m = baseSegmentSlope || Slope(baseSegment),
            pX,
            pY,
            qX,
            qY,
            bP = baseSegment.P,
            bPx = bP.X,
            bPy = bP.Y,
            bQ = baseSegment.Q,
            bQx = bQ.X,
            bQy = bQ.Y,
            pP = projectingSegment.P,
            pPx = pP.X,
            pPy = pP.Y,
            pQ = projectingSegment.Q,
            pQx = pQ.X,
            pQy = pQ.Y;
        switch (m) {
            case 0:
                pX = pPx;
                qX = pQx;
                pY = qY = bPy;
                break;
            case Infinity:
                pX = qX = bPx;
                pY = pPy;
                qY = pQy;
                break;
            default:
                var n = -1 / m,
                    diff = m - n;
                pX = (m * bPx - n * pPx + pPy - bPy) / diff;
                pY = m * (pX - bPx) + bPy;
                qX = (m * bQx - n * pQx + pQy - bQy) / diff;
                qY = m * (qX - bQx) + bQy;
                break;
        }
        return Segment(Point(pX, pY), Point(qX, qY));
    }

    /**
     * @return {number}
     */
    function PositionOfPoint(p, q, x, y) {
        var qx = q.X,
            qy = q.Y,
            px = p.X,
            py = p.Y;
        return (y - py) * (qx - px) - (x - px) * (qy - py);
    }

    /**
     * @return {number}
     */
    function PositionOfPointSlope(m, X, Y, x, y) {
        if (m >= 0) {
            return m * (X - x) + y - Y;
        } else {
            return m * (x - X) + Y - y;
        }
    }

    /**
     * @return {number}
     */
    function EvaluateSegment(segment, point, segmentSlope) {
        segmentSlope = segmentSlope || Slope(segment);
        switch (segmentSlope) {
            case 0:
                return point.Y - segment.P.Y;
                break;
            case Infinity:
                return point.X - segment.P.X;
                break;
            default:
                return point.Y - segment.P.Y - segmentSlope * (point.X - segment.P.X);
                break;
        }
    }

    /**
     * @return {boolean}
     */
    function InPolygon(vertices, point) {
        var wn = 0,
            n = vertices.length,
            i,
            j,
            x = point.X,
            y = point.Y;
        for (i = 0; i < n; i++) {
            j = (i + 1) % n;
            if (vertices[i].Y <= y) {
                if (vertices[j].Y > y) {
                    if (PositionOfPoint(vertices[i], vertices[j], x, y) > 0) {
                        ++wn;
                    }
                }
            } else {
                if (vertices[j].Y <= y) {
                    if (PositionOfPoint(vertices[i], vertices[j], x, y) < 0) {
                        --wn;
                    }
                }
            }
        }
        return 0 != wn;
    }

    function GetContactEdge(vertices, center, point) {
        var n = vertices.length,
            i,
            j,
            x = point.X,
            y = point.Y,
            p,
            q;
        for (i = 0; i < n; i++) {
            j = (i + 1) % n;
            p = vertices[i];
            q = vertices[j];
            if (PositionOfPoint(center, p, x, y) < 0 && PositionOfPoint(center, q, x, y) > 0)
                return {
                    Index: i,
                    Edge: Segment(p, q)
                };
        }
    }

    function GetContactPoint(vertices, vector, point) {
        var m = Slope(vector),
            sA = sign(vector.A),
            sB = sign(vector.B),
            X = point.X,
            Y = point.Y,
            n = vertices.length,
            i = 0,
            S, mS, cS,
            px, py,
            qx, qy,
            cp = Point(0, 0);
        switch (m) {
            case 0:
                for (; i < n; i++) {
                    S = Segment(vertices[i], vertices[(i + 1) % n]);
                    mS = Slope(S);
                    switch (mS) {
                        case 0:
                            break;
                        case Infinity:
                            px = S.P.X;
                            py = S.P.Y;
                            qx = S.Q.X;
                            qy = S.Q.Y;
                            if ((X > px && sA > 0) || (X < px && sA < 0)) {
                                cp.X = px;
                                cp.Y = Y;
                                if (PointInSegment(S, cp)) return cp;
                            }
                            break;
                        default:
                            px = S.P.X;
                            py = S.P.Y;
                            qx = S.Q.X;
                            qy = S.Q.Y;
                            if (-sA === sign(PositionOfPointSlope(mS, px, py, X, Y))) {
                                cp.X = ((Y - py) / mS) + px;
                                cp.Y = Y;
                                if (PointInSegment(S, cp)) return cp;
                            }
                            break;
                    }
                }
                break;
            case Infinity:
                for (; i < n; i++) {
                    S = Segment(vertices[i], vertices[(i + 1) % n]);
                    mS = Slope(S);
                    switch (mS) {
                        case 0:
                            px = S.P.X;
                            py = S.P.Y;
                            qx = S.Q.X;
                            qy = S.Q.Y;
                            if ((Y > py && sB > 0) || (Y < py && sB < 0)) {
                                cp.X = X;
                                cp.Y = py;
                                if (PointInSegment(S, cp)) return cp;
                            }
                            break;
                        case Infinity:
                            break;
                        default:
                            px = S.P.X;
                            py = S.P.Y;
                            qx = S.Q.X;
                            qy = S.Q.Y;
                            if (sB === sign(PositionOfPointSlope(mS, px, py, X, Y) * mS)) {
                                cp.X = X;
                                cp.Y = py + mS * (X - px);
                                if (PointInSegment(S, cp)) return cp;
                            }
                            break;
                    }
                }
                break;
            default:
                var c = Y - m * X;
                for (; i < n; i++) {
                    S = Segment(vertices[i], vertices[(i + 1) % n]);
                    mS = Slope(S);
                    switch (mS) {
                        case 0:
                            px = S.P.X;
                            py = S.P.Y;
                            qx = S.Q.X;
                            qy = S.Q.Y;
                            if ((Y > py && sB > 0) || (Y < py && sB < 0)) {
                                cp.X = (py - c) / m;
                                cp.Y = py;
                                if (PointInSegment(S, cp)) return cp;
                            }
                            break;
                        case Infinity:
                            px = S.P.X;
                            py = S.P.Y;
                            qx = S.Q.X;
                            qy = S.Q.Y;
                            if ((X > px && sA > 0) || (X < px && sA < 0)) {
                                cp.X = px;
                                cp.Y = m * px + c;
                                if (PointInSegment(S, cp)) return cp;
                            }
                            break;
                        default:
                            if (mS !== m) {
                                px = S.P.X;
                                py = S.P.Y;
                                qx = S.Q.X;
                                qy = S.Q.Y;
                                cS = py - mS * px;
                                cp.X = (c - cS) / (mS - m);
                                cp.Y = mS * cp.X + cS;
                                if (PointInSegment(S, cp) && (sign(cp.X - X) * sA <= 0) && (sign(cp.Y - Y) * sB <= 0)) return cp;
                            }
                            break;
                    }
                }
                break;
        }
        return cp;
    }

    /**
     * @return {boolean}
     */
    function PointInCircle(center, radius, point) {
        var X = point.X - center.X,
            Y = point.Y - center.Y;
        return (X * X + Y * Y) <= radius * radius;
    }

    function CircleSegmentIntersection(center, radius, segment, segmentSlope, segmentMagnitude) {
        var SegmentSlope = segmentSlope || Slope(segment),
            Distance = abs(DistanceFrom(segment, center, SegmentSlope, false));
        if (Distance <= radius) {
            var Projection = SegmentProjection(segment, Segment(segment.P, center), SegmentSlope),
                DistanceP = abs(DistanceFrom(segment.P, Projection.Q)),
                DistanceQ = abs(DistanceFrom(segment.Q, Projection.Q)),
                DistancePQ = DistanceP + DistanceQ,
                SegmentMagnitudeCeil = ceil(segmentMagnitude || Magnitude(segment));
            if (DEBUGGING) {
                DrawSegment(Projection, '#ffff00');
                DrawCircle(Projection.Q, 1, '#ffff00');
                DrawCircle(segment.P, 1, '#00ff00');
                DrawCircle(segment.Q, 1, '#ff0000');
            }
            if (ceil(DistancePQ) === SegmentMagnitudeCeil) {
                return radius - Distance;
            } else if (ceil(DistanceP) >= SegmentMagnitudeCeil && PointInCircle(center, radius, segment.Q)) {
                return radius - abs(DistanceFrom(center, segment.Q));
            } else if (ceil(DistanceQ) >= SegmentMagnitudeCeil && PointInCircle(center, radius, segment.P)) {
                return radius - abs(DistanceFrom(center, segment.P));
            } else return false;
        }
        return false;
    }

    /**
     * @return {number}
     */
    function OrdinateCorrection(ordinate) {
        return RESOLUTION_HEIGHT - ordinate;
    }

    // Some basic Debugging function go here.

    function DrawText(text, x, y, size, color) {
        color = color || '#ffffff';
        size = size || 16;
        DEBUGGING_CANVAS_CONTEXT.font = size + 'px Arial';
        DEBUGGING_CANVAS_CONTEXT.fillStyle = color;
        DEBUGGING_CANVAS_CONTEXT.fillText(text, x, OrdinateCorrection(y));
    }

    function DrawSegment(segment, color) {
        color = color || '#ffffff';
        DEBUGGING_CANVAS_CONTEXT.strokeStyle = color;
        DEBUGGING_CANVAS_CONTEXT.beginPath();
        DEBUGGING_CANVAS_CONTEXT.moveTo(segment.P.X, OrdinateCorrection(segment.P.Y));
        DEBUGGING_CANVAS_CONTEXT.lineTo(segment.Q.X, OrdinateCorrection(segment.Q.Y));
        DEBUGGING_CANVAS_CONTEXT.stroke();
    }

    function DrawPolygon(vertices, color) {
        color = color || '#ffffff';
        var i = 1,
            n = vertices.length;
        DEBUGGING_CANVAS_CONTEXT.strokeStyle = color;
        DEBUGGING_CANVAS_CONTEXT.beginPath();
        DEBUGGING_CANVAS_CONTEXT.moveTo(vertices[0].X, OrdinateCorrection(vertices[0].Y));
        for (; i < n; i++) DEBUGGING_CANVAS_CONTEXT.lineTo(vertices[i].X, OrdinateCorrection(vertices[i].Y));
        DEBUGGING_CANVAS_CONTEXT.closePath();
        DEBUGGING_CANVAS_CONTEXT.stroke();
    }

    function DrawRectangle(rectangle, color) {
        color = color || '#ffffff';
        DEBUGGING_CANVAS_CONTEXT.strokeStyle = color;
        DEBUGGING_CANVAS_CONTEXT.strokeRect(rectangle.Point.X, rectangle.Point.Y, rectangle.Width, rectangle.Height);
    }

    function DrawCircle(center, radius, color) {
        color = color || '#ffffff';
        DEBUGGING_CANVAS_CONTEXT.strokeStyle = color;
        DEBUGGING_CANVAS_CONTEXT.beginPath();
        DEBUGGING_CANVAS_CONTEXT.arc(center.X, OrdinateCorrection(center.Y), radius, 0, TWO_PI, false);
        DEBUGGING_CANVAS_CONTEXT.stroke();
    }

    function DrawArc(center, radius, angle, color) {
        color = color || '#ffffff';
        DEBUGGING_CANVAS_CONTEXT.strokeStyle = color;
        DEBUGGING_CANVAS_CONTEXT.beginPath();
        DEBUGGING_CANVAS_CONTEXT.arc(center.X, OrdinateCorrection(center.Y), radius, 0, angle, true);
        DEBUGGING_CANVAS_CONTEXT.stroke();
    }

    function DrawVector(center, vector, color) {
        color = color || '#00ff00';
        var CenterX = center.X,
            CenterY = center.Y,
            A = vector.A,
            B = vector.B,
            PointA = Point(CenterX + A * 100, CenterY),
            PointB = Point(CenterX, CenterY + B * 100),
            PointC = Point(CenterX + A * 100, CenterY + B * 100);
        DrawSegment(Segment(center, PointA), color);
        DrawCircle(PointA, 1, color);
        DrawSegment(Segment(center, PointB), color);
        DrawCircle(PointB, 1, color);
        DrawSegment(Segment(center, PointC), color);
        DrawCircle(PointC, 1, color);
    }

    function DrawAxis(point, color) {
        color = color || '#000000';
        var X = point.X,
            Y = OrdinateCorrection(point.Y);
        DEBUGGING_CANVAS_CONTEXT.strokeStyle = color;
        DEBUGGING_CANVAS_CONTEXT.beginPath();
        DEBUGGING_CANVAS_CONTEXT.moveTo(0, Y);
        DEBUGGING_CANVAS_CONTEXT.lineTo(RESOLUTION_WIDTH, Y);
        DEBUGGING_CANVAS_CONTEXT.moveTo(X, RESOLUTION_HEIGHT);
        DEBUGGING_CANVAS_CONTEXT.lineTo(X, 0);
        DEBUGGING_CANVAS_CONTEXT.stroke();
    }

    // ---------------------------------------------------------------------//
    // Ending Globals, which are common to all.
    // ---------------------------------------------------------------------//

    // ---------------------------------------------------------------------//
    // Starting Sprites, which manages the functions of each sprite.
    // ---------------------------------------------------------------------//

    // Initializing required variables.
    // Defining global constants.
    var SHAPES_CIRCLE = 1,
        SHAPES_POLYGON = 2,
        TYPES_DYNAMIC = 1,
        TYPES_STATIC = 2,
        SPECIAL_PLAYER = 1,
        SPECIAL_STAR = 2,
        SPECIAL_SPIKE = 3,
    // Creating arrays to store sprite information. [A total of 25 elements.]
        NumberOfSprites = 0,
        TypeArray = [], // Stores the Type of the created sprites.
        SpecialArray = [], // Stores the Special Type of the created sprites.
        StaticArray = [], // Stores the Indices of the static sprites.
        StaticCount = 0,
        DynamicArray = [], // Stores the Indices of the dynamic sprites.
        DynamicCount = 0,
        PhysicsArray = [], // Stores the Indices of the dynamic sprites for which physics have to be processed.
        PhysicsCount = 0,
        SizeArray = [], // Stores the size object of respective sprites.
        HalfSizeArray = [], // Stores the size object of respective sprites which has values divided by 2.
        ImageSizeArray = [], // Stores the size object containing real size of the image of respective sprites.
        FrameColumnArray = [], // Stores number of Columns of frames of respective sprites.
        FrameRowArray = [], // Stores number of Rows of frames of respective sprites.
        CurrentFrameArray = [], // Stores current frame that is to be printed of respective sprites.
        ClipXArray = [], // Stores the ClipX values in the form of an array of respective frames of sprites.
        ClipYArray = [], // Stores the ClipY values in the form of an array of respective frames of sprites.
        DrawMethodArray = [], // Stores the drawing method for the sprite.
        ClipArray = [], // Stores the information whether to clip the sprite or not.
        RepeatArray = [],
        ImageDOMArray = [], // Stores the file name of the image which is present in the 'drawable' folder of the respective sprite.
        TextureArray = [], // Stores the reference to cached image data in a temporary canvas to speed up the rendering process.
    // In case of pattern, the image is created and cached first with suitable size, so as to skip drawing of pattern
    // while the game is running, to increase the performance.
        CenterArray = [], // Stores an Point object having the coordinates of the center of the respective sprites.
        RotationCenterArray = [], // Stores an Point object having the coordinates of the center of rotation for the respective sprites.
        RotationCenterEqualArray = [], // Stores the boolean whether the center and rotation center of the sprite are equal or not.
        RotationArray = [], // Stores the angle of rotation with respect to the y-axis in terms of radians of the respective sprites.
        OpacityArray = [],// Stores the opacity of the sprite.
        ScaleArray = [],// Stores the scale of the sprite.
        ShapeTypeArray = [], // Stores the type of shape of respective sprites.
        DimensionsArray = [], // Stores an array containing dimensions of respective sprites.
        VerticesArray = [], // Stores an array containing vertices of respective sprites.
        ImageVerticesArray = [],// Stores an array containing image vertices, i.e., without any rotation with origin shifting and mirroring so that all vertices are positive, of the respective sprites.
        BoundingRectangleArray = [], // Stores the vertices of the bounding rectangle of respective sprites.
        CORArray = [], // Stores coefficient of restitution of the respective sprites.
        COFArray = [], // Stores coefficient of friction of the respective sprites.
        ComplementCOFArray = [], // Stores (1 - (coefficient of friction)) of the respective sprites.
        VelocityArray = [], // Stores an Vector object having the horizontal and vertical velocity magnitudes (metre/sec) of the respective sprites.
        AngularVelocityArray = [], // Stores the angular velocity (rads/sec) value of the respective sprites.
        ContactArray = [],// Stores an array of boolean whether the sprite is in contact with other sprites or not.
        NUMBER_OF_ELEMENTS = 6, // 1 - Initialization & 5 - Texture Caching
        LOADING_DOM,
        LOADING_STATE_DOM,
        LOADING_PERCENTAGE_DOM,
        PLAYER;

    // Defining basic sprite functions.

    function ClearArrays() {
        NumberOfSprites = 0;
        TypeArray.length = 0;
        SpecialArray.length = 0;
        StaticArray.length = 0;
        StaticCount = 0;
        DynamicArray.length = 0;
        DynamicCount = 0;
        PhysicsArray.length = 0;
        PhysicsCount = 0;
        SizeArray.length = 0;
        HalfSizeArray.length = 0;
        ImageSizeArray.length = 0;
        FrameColumnArray.length = 0;
        FrameRowArray.length = 0;
        CurrentFrameArray.length = 0;
        ClipXArray.length = 0;
        ClipYArray.length = 0;
        DrawMethodArray.length = 0;
        ClipArray.length = 0;
        RepeatArray.length = 0;
        ImageDOMArray.length = 0;
        TextureArray.length = 0;
        CenterArray.length = 0;
        RotationCenterArray.length = 0;
        RotationCenterEqualArray.length = 0;
        RotationArray.length = 0;
        OpacityArray.length = 0;
        ScaleArray.length = 0;
        ShapeTypeArray.length = 0;
        DimensionsArray.length = 0;
        VerticesArray.length = 0;
        ImageVerticesArray.length = 0;
        BoundingRectangleArray.length = 0;
        RotationCenterArray.length = 0;
        CORArray.length = 0;
        COFArray.length = 0;
        ComplementCOFArray.length = 0;
        VelocityArray.length = 0;
        AngularVelocityArray.length = 0;
        ContactArray.length = 0;
    }

    /**
     * @return {number}
     */
    function ProcessType(type, index) {
        switch (type) {
            case 'static':
                return TYPES_STATIC;
                break;
            case 'dynamic':
                return TYPES_DYNAMIC;
                break;
            // If any error, treat it as a static sprite.
            default:
                Debug('Sprite-' + index + ' type is not defined correctly, assuming it to be STATIC.', MESSAGE_INFORMATION);
                return TYPES_STATIC;
                break;
        }
    }

    /**
     * @return {number}
     */
    function ProcessDimension(dimension) {
        if (typeof dimension === 'string') {
            switch (dimension) {
                case 'width':
                    return RESOLUTION_WIDTH;
                    break;
                case 'halfWidth':
                    return HALF_RESOLUTION_WIDTH;
                    break;
                case 'height':
                    return RESOLUTION_HEIGHT;
                    break;
                case 'halfHeight':
                    return HALF_RESOLUTION_HEIGHT;
                    break;
                case '-width':
                    return -RESOLUTION_WIDTH;
                    break;
                case '-halfWidth':
                    return -HALF_RESOLUTION_WIDTH;
                    break;
                case '-height':
                    return -RESOLUTION_HEIGHT;
                    break;
                case '-halfHeight':
                    return -HALF_RESOLUTION_HEIGHT;
                    break;
                default:
                    return ceil(Number(dimension));
                    break;
            }
        } else return ceil(dimension);
    }

    function ProcessSize(size) {
        return Size(ProcessDimension(size[0]), ProcessDimension(size[1]));
    }

    function ProcessClipXArray(columns, rows, width) {
        var i = 1,
            Array = [];
        for (; i <= columns * rows; i++) Array.push((i % columns === 0 ? (columns - 1) : (i % columns) - 1) * width);
        return Array;
    }

    function ProcessClipYArray(columns, rows, height) {
        var i = 1,
            Array = [];
        for (; i <= columns * rows; i++) Array.push((ceil(i / rows) - 1) * height);
        return Array;
    }

    /**
     * @return {number}
     */
    function ProcessRotation(rotation) {
        // Converting Rotation angle to positive and within the range [0, 360]
        if (rotation < 0) while (rotation < 0) rotation += TWO_PI;
        return RoundDecimal(rotation % TWO_PI);
    }

    /**
     * @return {number}
     */
    function ProcessShapeType(type) {
        switch (type) {
            case 'circle':
                return SHAPES_CIRCLE;
                break;
            case 'polygon':
                return SHAPES_POLYGON;
                break;
            // If any error, treat it as a static sprite.
            default:
                Debug('Sprite-' + index + ' shape type is not defined correctly, assuming it to be SHAPES_POLYGON.', MESSAGE_INFORMATION);
                return SHAPES_POLYGON;
                break;
        }
    }

    /**
     * @return {number}
     */
    function ProcessSpecialType(special) {
        switch (special) {
            case 'player':
                return SPECIAL_PLAYER;
                break;
            case 'star':
                return SPECIAL_STAR;
                break;
            case 'spike':
                return SPECIAL_SPIKE;
                break;
            // Not Special.
            default:
                return 0;
                break;
        }
    }

    function ProcessCenter(center, halfSize) {
        var Center = Point(0, 0),
            HalfWidth = halfSize.Width,
            HalfHeight = halfSize.Height,
            centerX = center[0],
            centerY = center[1];
        switch (centerX) {
            case 'left':
                Center.X = HalfWidth;
                break;
            case 'center':
                Center.X = HALF_RESOLUTION_WIDTH;
                break;
            case 'right':
                Center.X = RESOLUTION_WIDTH - HalfWidth;
                break;
            default:
                Center.X = ProcessDimension(centerX);
                break;
        }
        switch (centerY) {
            case 'top':
                Center.Y = OrdinateCorrection(HalfHeight);
                break;
            case 'center':
                Center.Y = OrdinateCorrection(HALF_RESOLUTION_HEIGHT);
                break;
            case 'bottom':
                Center.Y = OrdinateCorrection(RESOLUTION_HEIGHT - HalfHeight);
                break;
            default:
                Center.Y = ProcessDimension(centerY);
                break;
        }
        return Center;
    }

    function ProcessShapeDimensions(dimensions, shapeType, vertices) {
        switch (shapeType) {
            case SHAPES_CIRCLE:
                var dimension = ProcessDimension(dimensions[0]);
                return {
                    Radius: dimension,
                    HalfRadius: RoundDecimal(dimension / 2),
                    DoubleRadius: dimension * 2
                };
                break;
            case SHAPES_POLYGON:
                var Dimensions = [],
                    i = 0,
                    n = vertices.length;
                for (; i < n; i++) {
                    Dimensions[i] = RoundDecimal(Magnitude(Segment(vertices[i], vertices[(i + 1) % n])));
                }
                return {
                    Sides: Dimensions,
                    //HalfSides: Dimensions.map(function (i) {
                    //    return RoundDecimal(i / 2);
                    //}),
                    //DoubleSides: Dimensions.map(function (i) {
                    //    return RoundDecimal(i * 2);
                    //}),
                    //CeilHalfSides: Dimensions.map(function (i) {
                    //    return ceil(i / 2);
                    //}),
                    //CeilDoubleSides: Dimensions.map(function (i) {
                    //    return ceil(i * 2);
                    //}),
                    CeilSides: Dimensions.map(function (i) {
                        return ceil(i);
                    })
                };
                break;
        }
    }

    function ProcessVertices(vertices, center, rotationPoint, rotation) {
        var CenterX = center.X,
            CenterY = center.Y,
            RotationCenterX = rotationPoint.X,
            RotationCenterY = rotationPoint.Y,
            RotationCheck = rotation !== 0,
            Vertices = [],
            n = vertices.length,
            j = 0;
        if (n > 2) {
            Vertices = vertices.map(function (v) {
                return Point(ProcessDimension(v[0]), ProcessDimension(v[1]));
            });
            for (; j < n; j++) {
                ShiftOrigin(Vertices[j], -CenterX, -CenterY);
                if (RotationCheck) {
                    ShiftOrigin(Vertices[j], RotationCenterX, RotationCenterY);
                    RotatePoint(Vertices[j], rotation);
                    ShiftOrigin(Vertices[j], -RotationCenterX, -RotationCenterY);
                }
            }
        }
        return Vertices;
    }

    function ProcessImageVertices(vertices, halfSize) {
        var Vertices = [],
            HalfWidth = halfSize.Width,
            HalfHeight = halfSize.Height,
            n = vertices.length,
            j = 0;
        if (n > 2) {
            Vertices = vertices.map(function (v) {
                return Point(ProcessDimension(v[0]), ProcessDimension(v[1]));
            });
            for (; j < n; j++) {
                ShiftOrigin(Vertices[j], -HalfWidth, HalfHeight);
                Vertices[j].Y *= -1;
            }
        }
        return Vertices;
    }

    function ProcessBoundingRectangle(shapeType, center, dimensions, vertices) {
        var BoundingRectangle = {};
        switch (shapeType) {
            case SHAPES_CIRCLE:
                BoundingRectangle.Point = Point(center.X - dimensions.Radius, OrdinateCorrection(center.Y + dimensions.Radius));
                BoundingRectangle.Width = dimensions.DoubleRadius;
                BoundingRectangle.Height = dimensions.DoubleRadius;
                break;
            case SHAPES_POLYGON:
                var Vertices = vertices,
                    n = Vertices.length,
                    MaxAbscissa = Vertices[0].X,
                    MinAbscissa = Vertices[0].X,
                    MaxOrdinate = Vertices[0].Y,
                    MinOrdinate = Vertices[0].Y,
                    j = 1,
                    x,
                    y;
                for (; j < n; j++) {
                    x = Vertices[j].X;
                    y = Vertices[j].Y;
                    if (x > MaxAbscissa) MaxAbscissa = x;
                    else if (x < MinAbscissa) MinAbscissa = x;
                    if (y > MaxOrdinate) MaxOrdinate = y;
                    else if (y < MinOrdinate) MinOrdinate = y;
                }
                BoundingRectangle.Point = Point(MinAbscissa, OrdinateCorrection(MaxOrdinate));
                BoundingRectangle.Width = MaxAbscissa - MinAbscissa;
                BoundingRectangle.Height = MaxOrdinate - MinOrdinate;
                break;
        }
        return BoundingRectangle;
    }

    function UpdateVertices(i, deltaX, deltaY, theta, deltaCheck, thetaCheck) {
        if (ShapeTypeArray[i] !== SHAPES_CIRCLE) {
            var RotationCenter = RotationCenterArray[i],
                RotationCenterX = RotationCenter.X,
                RotationCenterY = RotationCenter.Y,
                Vertices = VerticesArray[i],
                n = Vertices.length,
                Vertex,
                j = 0;
            if (deltaCheck && thetaCheck) {
                for (; j < n; j++) {
                    Vertex = Vertices[j];
                    Vertex.X += deltaX;
                    Vertex.Y += deltaY;
                    ShiftOrigin(Vertex, RotationCenterX, RotationCenterY);
                    RotatePoint(Vertex, theta);
                    ShiftOrigin(Vertex, -RotationCenterX, -RotationCenterY);
                }
            } else if (deltaCheck) {
                for (; j < n; j++) {
                    Vertex = Vertices[j];
                    Vertex.X += deltaX;
                    Vertex.Y += deltaY;
                }
            } else if (thetaCheck) {
                for (; j < n; j++) {
                    Vertex = Vertices[j];
                    ShiftOrigin(Vertex, RotationCenterX, RotationCenterY);
                    RotatePoint(Vertex, theta);
                    ShiftOrigin(Vertex, -RotationCenterX, -RotationCenterY);
                }
            }
        }
    }

    function UpdateBoundingRectangle(i) {
        var BoundingRectangle = BoundingRectangleArray[i],
            ShapeType = ShapeTypeArray[i];
        switch (ShapeType) {
            case SHAPES_CIRCLE:
                var Center = CenterArray[i],
                    Radius = DimensionsArray[i].Radius;
                BoundingRectangle.Point = Point(Center.X - Radius, OrdinateCorrection(Center.Y + Radius));
                break;
            case SHAPES_POLYGON:
                var Vertices = VerticesArray[i],
                    n = Vertices.length,
                    MaxAbscissa = Vertices[0].X,
                    MinAbscissa = Vertices[0].X,
                    MaxOrdinate = Vertices[0].Y,
                    MinOrdinate = Vertices[0].Y,
                    j = 1,
                    x,
                    y;
                for (; j < n; j++) {
                    x = Vertices[j].X;
                    y = Vertices[j].Y;
                    if (x > MaxAbscissa) MaxAbscissa = x;
                    else if (x < MinAbscissa) MinAbscissa = x;
                    if (y > MaxOrdinate) MaxOrdinate = y;
                    else if (y < MinOrdinate) MinOrdinate = y;
                }
                BoundingRectangle.Point.X = MinAbscissa;
                BoundingRectangle.Point.Y = OrdinateCorrection(MaxOrdinate);
                BoundingRectangle.Width = MaxAbscissa - MinAbscissa;
                BoundingRectangle.Height = MaxOrdinate - MinOrdinate;
                break;
        }
    }

    function AddImageDOM(i, file) {
        var ID = file.substring(0, file.lastIndexOf('.')),
            ImageDOM = $('#' + ID, RESOURCES_HOLDER_DOM);
        if (!ImageDOM.length) {
            ImageDOMArray[i] = $('<img id="' + ID + '" for="' + i + '" src="' + GetImageURL(file) + '"/>').appendTo(RESOURCES_HOLDER_DOM)[0];
        } else {
            var ForArray = ImageDOM.attr('for').split(',');
            ForArray.push(i);
            ImageDOM.attr('for', ForArray.join(','));
            ImageDOMArray[i] = ImageDOM[0];
        }
    }

    function CacheImage(i, image) {
        var Repeat = RepeatArray[i],
            Width = Repeat ? SizeArray[i].Width : ImageSizeArray[i].Width,
            Height = Repeat ? SizeArray[i].Height : ImageSizeArray[i].Height,
            cacheCanvas = $('<canvas id="Texture-' + i + '"></canvas>').appendTo(RESOURCES_HOLDER_DOM).css({
                width: Width,
                height: Height
            })[0],
            cacheCanvasContext = cacheCanvas.getContext('2d');
        cacheCanvas.width = Width;
        cacheCanvas.height = Height;
        if (DrawMethodArray[i] !== 'fillPoly') {
            if (Repeat) {
                cacheCanvasContext.fillStyle = cacheCanvasContext.createPattern(image, Repeat);
                cacheCanvasContext.fillRect(0, 0, Width, Height);
            } else {
                cacheCanvasContext.drawImage(image, 0, 0, Width, Height);
            }
        } else {
            var ImageVertices = ImageVerticesArray[i],
                n = ImageVertices.length,
                j = 1;
            cacheCanvasContext.fillStyle = cacheCanvasContext.createPattern(image, Repeat);
            cacheCanvasContext.beginPath();
            cacheCanvasContext.moveTo(ImageVertices[0].X, ImageVertices[0].Y);
            for (; j < n; j++) cacheCanvasContext.lineTo(ImageVertices[j].X, ImageVertices[j].Y);
            cacheCanvasContext.closePath();
            cacheCanvasContext.fill();
        }
        return cacheCanvas;
    }

    /**
     * @return {string}
     */
    function GetImageURL(fileName) {
        return [URL, 'resources/drawable/', fileName].join('');
    }

    /**
     * @return {string}
     */
    function GetSpritesJSONPath(stageNumber) {
        return [URL, 'resources/stage/', stageNumber, '/sprites.json'].join('');
    }

    function UpdateLoadingState(state) {
        LOADING_STATE_DOM.html(state);
    }

    function UpdateLoadingPercentage(count) {
        LOADING_PERCENTAGE_DOM.html(Round(count * 100 / (NumberOfSprites * NUMBER_OF_ELEMENTS)));
    }

    function LoadSprites(stageNumber, callback) {

        // Clearing previous data in arrays.
        ClearArrays();

        // Generating Loading frame.
        LOADING_DOM = $('\
        <table id="LoadingFrame" width="' + WINDOW_WIDTH + 'px" height="' + WINDOW_HEIGHT + 'px" cellpadding="0" cellspacing="0" border="0" align="center" valign="middle">\
            <tbody width="100%" height="100%" align="center" valign="middle">\
                <tr width="100%" height="100%" align="center" valign="middle">\
                    <td width="100%" height="100%" align="center" valign="middle">\
                        <div id="Header">Loading...</div>\
                        <div id="Container">\
                            <div id="State">Loading...</div>\
                            <div id="Percentage"><span>0</span>%</div>\
                        </div>\
                    </td>\
                </tr>\
            </tbody>\
        </table>').appendTo('body');
        LOADING_STATE_DOM = LOADING_DOM.find('#State');
        LOADING_PERCENTAGE_DOM = LOADING_DOM.find('#Percentage span');

        // Reading data from JSON file.
        $.get(GetSpritesJSONPath(stageNumber), function (json) {
            var Sprites = json,
                Sprite,
                Count = 0,
                i = 0,
                j = 0,
                UniqueImageDOMArray,
                UniqueImageDOMArrayLength;
            NumberOfSprites = Sprites.length;
            UpdateLoadingState('Initializing...');
            for (; i < NumberOfSprites; i++) {
                Sprite = Sprites[i];
                TypeArray[i] = ProcessType(Sprite.type);
                if (TypeArray[i] === TYPES_STATIC) {
                    StaticArray.push(i);
                    StaticCount++;
                }
                else if (TypeArray[i] === TYPES_DYNAMIC) {
                    DynamicArray.push(i);
                    DynamicCount++;
                    if (Sprite.physics) {
                        PhysicsArray.push(i);
                        PhysicsCount++;
                    }
                }
                SpecialArray[i] = ProcessSpecialType(Sprite.special);
                if (SpecialArray[i] === SPECIAL_PLAYER) PLAYER = i;
                SizeArray[i] = ProcessSize(Sprite.size);
                HalfSizeArray[i] = Size(RoundDecimal(SizeArray[i].Width / 2), RoundDecimal(SizeArray[i].Height / 2));
                FrameColumnArray[i] = parseInt(Sprite.frames.columns, 10);
                FrameRowArray[i] = parseInt(Sprite.frames.rows, 10);
                CurrentFrameArray[i] = parseInt(Sprite.frames.current, 10);
                ImageSizeArray[i] = Size(ProcessDimension(Sprite.image.width), ProcessDimension(Sprite.image.height));
                DrawMethodArray[i] = Sprite.image.drawMethod;
                if (DrawMethodArray[i] === 'fillPoly') {
                    ClipArray[i] = false;
                    RepeatArray[i] = 'repeat';
                } else {
                    ClipArray[i] = DrawMethodArray[i] === 'clip';
                    RepeatArray[i] = ClipArray[i] ? false : DrawMethodArray[i];
                }
                ClipXArray[i] = ProcessClipXArray(FrameColumnArray[i], FrameRowArray[i], SizeArray[i].Width);
                ClipYArray[i] = ProcessClipYArray(FrameColumnArray[i], FrameRowArray[i], SizeArray[i].Height);
                AddImageDOM(i, Sprite.image.file);
                CenterArray[i] = ProcessCenter(Sprite.center, HalfSizeArray[i]);
                RotationCenterArray[i] = ProcessCenter(Sprite.rotationCenter, HalfSizeArray[i]);
                RotationCenterEqualArray[i] = (CenterArray[i].X === RotationCenterArray[i].X) && (CenterArray[i].Y === RotationCenterArray[i].Y);
                RotationArray[i] = ProcessRotation(parseFloat(Sprite.rotation) * PI_BY_ONE_EIGHTY);
                ScaleArray[i] = RoundDecimal(Sprite.scale);
                ShapeTypeArray[i] = ProcessShapeType(Sprite.shape.type);
                VerticesArray[i] = ProcessVertices(Sprite.shape.vertices, CenterArray[i], RotationCenterArray[i], RotationArray[i]);
                DimensionsArray[i] = ProcessShapeDimensions(Sprite.shape.dimensions, ShapeTypeArray[i], VerticesArray[i]);
                ImageVerticesArray[i] = ProcessImageVertices(Sprite.shape.vertices, HalfSizeArray[i]);
                BoundingRectangleArray[i] = ProcessBoundingRectangle(ShapeTypeArray[i], CenterArray[i], DimensionsArray[i], VerticesArray[i]);
                OpacityArray[i] = RoundDecimal(Sprite.opacity);
                CORArray[i] = RoundDecimal(Sprite.cor);
                COFArray[i] = RoundDecimal(Sprite.cof);
                ComplementCOFArray[i] = RoundDecimal(1 - COFArray[i]);
                VelocityArray[i] = Vector(RoundDecimal(Sprite.velocity[0]), RoundDecimal(Sprite.velocity[1]));
                AngularVelocityArray[i] = Sprite.angularVelocity;
                ContactArray[i] = false;
                UpdateLoadingPercentage(++Count);
            }
            UpdateLoadingState('Caching Textures...');
            UniqueImageDOMArray = $.unique(ImageDOMArray);
            UniqueImageDOMArrayLength = UniqueImageDOMArray.length;
            for (; j < UniqueImageDOMArrayLength; j++) $(ImageDOMArray[j]).on('load', function () {
                var ImageDOM = this,
                    ForArray = $(ImageDOM).attr('for').split(','),
                    ForCount = ForArray.length,
                    For,
                    k = 0;
                for (; k < ForCount; k++) {
                    For = ForArray[k];
                    TextureArray[For] = CacheImage(For, ImageDOM);
                    Count += 5;
                    UpdateLoadingPercentage(Count);
                }
                if (Count === NumberOfSprites * NUMBER_OF_ELEMENTS) {
                    LOADING_DOM.fadeOut(500, function () {
                        LOADING_DOM.remove();
                        callback();
                    });
                }
            }).on('error', function () {
                Debug('Image for Sprites - ' + $(this).attr('for') + ' cannot be loaded, please check the path of the image or if it exists.', MESSAGE_ERROR);
            });
        });

    }

    // ---------------------------------------------------------------------//
    // Ending Sprites, which manages the functions of each sprite.
    // ---------------------------------------------------------------------//

    // ---------------------------------------------------------------------//
    // Starting Stage, which manages the functions of each stage.
    // ---------------------------------------------------------------------//

    var NameArray = [], // Stores the name of the respective stage.
        DescriptionArray = [], // Stores the description of the respective stage.
        ArtworkArray = [], // Stores the artwork of the stage.
        BackgroundArray = [], // Stores the background of the stage.
        MusicArray = [], // Stores an array of music for a particular stage.
        NumberOfStages; // Stores the number of stages, duh.

    function LoadStages(callback) {
        $.get(URL + 'resources/stage/stages.xml', function (xml) {
            var Stages = $(xml).find('stage'),
                Stage;
            NumberOfStages = Stages.length;
            Stages.each(function (i) {
                Stage = $(this);
                NameArray[i] = Stage.find('name').text();
                DescriptionArray[i] = Stage.find('description').text();
                ArtworkArray[i] = Stage.find('artwork').text();
                BackgroundArray[i] = Stage.find('background').text();
                MusicArray[i] = Stage.find('music').text().split('|');
            });
            callback();
        });
    }

    // ---------------------------------------------------------------------//
    // Ending Stage, which manages the functions of each stage.
    // ---------------------------------------------------------------------//

    // ---------------------------------------------------------------------------------------//
    // Starting Engine, which manages the functions that are required for the game to run.
    // ---------------------------------------------------------------------------------------//

    var GameLoopID,
        GameStarted = false,
        MenuStarted = false,
        Paused = false,
        TimeDelta = DEFAULT_TIME_DELTA,
        TimeCorrection = 0,
        LastTime = 0,
        KeyNameArray = [],
        KeyCharacterArray = [],
        KeyCodeArray = [],
        KeyPressedArray = [],
        KeyTimeArray = [],
        NumberOfKeys,
        NumberOfMenuImages = 0,
        NumberOfMenuImagesDone = 0,
        NumberOfStrings = 0,
        StringDOMArray = [],
        MenuKeysLoggerStarted = false,
        SaveGameFound = false;

    function GetTime() {
        return window.performance.now();
    }

    function LoadKeys(callback) {
        $.get(URL + 'resources/keys.xml', function (xml) {
            var Keys = $(xml).find('key'),
                Key;
            NumberOfKeys = Keys.length;
            Keys.each(function (i) {
                Key = $(this);
                KeyNameArray[i] = Key.find('name').text();
                KeyCharacterArray[i] = Key.find('character').text();
                KeyCodeArray[i] = parseInt(Key.find('code').text(), 10);
                KeyPressedArray[i] = false;
                KeyTimeArray[i] = 0;
            });
            callback();
        });
    }

    /**
     * @return {number}
     */
    function GetKeyIndexByCode(code) {
        var i,
            n = NumberOfKeys;
        for (i = 0; i < n; i++) {
            if (KeyCodeArray[i] === code) return i;
        }
        return -1;
    }

    /**
     * @return {number}
     */
    function GetKeyIndexByName(name) {
        var i,
            n = NumberOfKeys;
        for (i = 0; i < n; i++) {
            if (KeyNameArray[i] === name) return i;
        }
        return -1;
    }

    function IsKeyPressed(name) {
        return KeyPressedArray[GetKeyIndexByName(name)];
    }

    /**
     * @return {number}
     */
    function GetKeyHoldTime(name) {
        return GetTime() - KeyTimeArray[GetKeyIndexByName(name)];
    }

    function ResetKeys() {
        var i,
            n = NumberOfKeys;
        for (i = 0; i < n; i++) {
            KeyPressedArray[i] = false;
            KeyTimeArray[i] = 0;
        }
    }

    function RequestAnimationFrame(callback) {
        return window.requestAnimationFrame(callback) || window.webkitRequestAnimationFrame(callback) || window.mozRequestAnimationFrame(callback);
    }

    function CancelAnimationFrame(loopID) {
        if (window.cancelAnimationFrame) {
            window.cancelAnimationFrame(loopID);
        } else if (window.webkitCancelAnimationFrame) {
            window.webkitCancelAnimationFrame(loopID);
        } else if (window.mozCancelAnimationFrame) {
            window.mozCancelAnimationFrame(loopID);
        }
    }

    // Menu Related functions go here.

    $.fn.InCenterWithCanvas = function (halfWidth, halfHeight) {
        var Element = $(this);
        halfWidth = halfWidth || (Element.width() / 2);
        halfHeight = halfHeight || (Element.height() / 2);
        Element.css({
            top: HALF_CANVAS_HEIGHT - halfHeight,
            left: HALF_CANVAS_WIDTH - halfWidth
        });
        return Element;
    };

    $.fn.SetScaleTo = function (scale, after) {
        return $(this).attr('scale', scale).CSS({
            scale: scale
        }, after);
    };

    $.fn.PositionAt = function (top, left) {
        var Element = $(this);
        switch (top) {
            case 'top':
                top = 0;
                break;
            case 'center':
                top = HALF_CANVAS_HEIGHT - (Element.height() / 2);
                break;
            case 'bottom':
                top = CANVAS_HEIGHT - Element.height();
                break;
        }
        switch (left) {
            case 'left':
                left = 0;
                break;
            case 'center':
                left = HALF_CANVAS_WIDTH - (Element.width() / 2);
                break;
            case 'right':
                left = HALF_CANVAS_WIDTH - Element.width();
                break;
        }
        return Element.css({
            top: top,
            left: left
        });
    };

    $.fn.TranslateBy = function (x, y) {
        var Element = $(this),
            Position = Element.position();
        Element.css({
            top: Position.top + y,
            left: Position.left + x
        });
        return Element;
    };

    function StartSplashScreen(stage) {
        stage = stage || 1;
        switch (stage) {
            case 1:
                SPLASH_SCREEN_TITLE_DOM.velocity('stop').InCenterWithCanvas(350, 174).CSS({
                    scale: 0.5
                }, function () {
                    SPLASH_SCREEN_TITLE_DOM.velocity({
                        scale: 1,
                        opacity: 1
                    }, {
                        duration: 500,
                        easing: 'linear',
                        complete: function () {
                            StartSplashScreen(2);
                        }
                    });
                });
                SPLASH_SCREEN_STAR_ONE_DOM.velocity('stop').InCenterWithCanvas(100, 105).CSS({
                    scale: 0.5,
                    rotateX: 20,
                    rotateY: 20,
                    rotateZ: 0
                }, function () {
                    SPLASH_SCREEN_STAR_ONE_DOM.velocity({
                        scale: 1,
                        opacity: 1,
                        rotateZ: 360,
                        top: HALF_CANVAS_HEIGHT + 10,
                        left: HALF_CANVAS_WIDTH - 400
                    }, {
                        duration: 500,
                        easing: 'linear'
                    });
                });
                SPLASH_SCREEN_STAR_TWO_DOM.velocity('stop').InCenterWithCanvas(100, 105).CSS({
                    scale: 0.5,
                    rotateX: 160,
                    rotateY: 160,
                    rotateZ: 0
                }, function () {
                    SPLASH_SCREEN_STAR_TWO_DOM.velocity({
                        scale: 1,
                        opacity: 1,
                        rotateZ: -360,
                        top: HALF_CANVAS_HEIGHT + 10,
                        left: HALF_CANVAS_WIDTH + 200
                    }, {
                        duration: 500,
                        easing: 'linear'
                    });
                });
                break;
            case 2:
                SPLASH_SCREEN_TITLE_DOM.velocity({
                    scale: 1.3
                }, {
                    duration: 20000,
                    easing: 'linear',
                    complete: function () {
                        StartSplashScreen(3);
                    }
                });
                SPLASH_SCREEN_STAR_ONE_DOM.velocity({
                    scale: 1.3,
                    rotateZ: 720,
                    top: HALF_CANVAS_HEIGHT + 40,
                    left: HALF_CANVAS_WIDTH - 490
                }, {
                    duration: 20000,
                    easing: 'linear'
                });
                SPLASH_SCREEN_STAR_TWO_DOM.velocity({
                    scale: 1.3,
                    rotateZ: -720,
                    top: HALF_CANVAS_HEIGHT + 40,
                    left: HALF_CANVAS_WIDTH + 290
                }, {
                    duration: 20000,
                    easing: 'linear'
                });
                break;
            case 3:
                SPLASH_SCREEN_TITLE_DOM.velocity({
                    scale: 1.375,
                    opacity: 0.0
                }, {
                    duration: 5000,
                    easing: 'linear',
                    complete: function () {
                        StartSplashScreen(1);
                    }
                });
                SPLASH_SCREEN_STAR_ONE_DOM.velocity({
                    scale: 1.375,
                    opacity: 0.0,
                    rotateZ: 790,
                    top: HALF_CANVAS_HEIGHT + 48,
                    left: HALF_CANVAS_WIDTH - 515
                }, {
                    duration: 5000,
                    easing: 'linear'
                });
                SPLASH_SCREEN_STAR_TWO_DOM.velocity({
                    scale: 1.375,
                    opacity: 0.0,
                    rotateZ: -790,
                    top: HALF_CANVAS_HEIGHT + 48,
                    left: HALF_CANVAS_WIDTH + 315
                }, {
                    duration: 5000,
                    easing: 'linear'
                });
                break;
        }
    }

    function StopSplashScreen(callback) {
        SPLASH_SCREEN_TITLE_DOM.velocity({
            scale: 1,
            opacity: 1
        }, {
            duration: 1000,
            easing: 'linear',
            complete: function () {
                SPLASH_SCREEN_TITLE_DOM.velocity('stop');
                SPLASH_SCREEN_STAR_ONE_DOM.velocity('stop');
                SPLASH_SCREEN_STAR_TWO_DOM.velocity('stop');
                callback();
            }
        });
        SPLASH_SCREEN_STAR_ONE_DOM.velocity({
            scale: 1.3,
            opacity: 1,
            rotateZ: 990,
            top: CANVAS_HEIGHT,
            left: -200
        }, {
            duration: 1000,
            easing: 'linear'
        });
        SPLASH_SCREEN_STAR_TWO_DOM.velocity({
            scale: 1.3,
            opacity: 1,
            rotateZ: -990,
            top: CANVAS_HEIGHT,
            left: CANVAS_WIDTH + 200
        }, {
            duration: 1000,
            easing: 'linear'
        });
    }

    function LoadMenuImages(file, callback) {
        $.get(URL + 'resources/' + file, function (xml) {
            var MenuImages = $(xml).find('image'),
                MenuImage;
            NumberOfMenuImages = MenuImages.length;
            MenuImages.each(function (i) {
                MenuImage = $(this);
                $('<img class="MenuImages" id="MenuImage-' + i + '" for="' + MenuImage.find('for').text() + '" fit="' + MenuImage.find('fit').text() + '" src="' + URL + 'resources/drawable/' + MenuImage.find('file').text() + '"/>').appendTo(RESOURCES_HOLDER_DOM).on('load', function () {
                    NumberOfMenuImagesDone++;
                    if ((NumberOfMenuImagesDone / NumberOfMenuImages) === 1) {
                        callback();
                    }
                }).on('error', function () {
                    Debug('Critical error occured, cannot load all of the menu images.', MESSAGE_ERROR);
                });
            });
        });
    }

    function CreateString(index, string, id, scale, family) {
        var StringLength = string.length,
            StringEnclosure = $('<div class="Strings" id="String-' + index + '" stringID="' + id + '" length=' + StringLength + '></div>').appendTo(STRINGS_HOLDER_DOM).SetScaleTo(scale),
            i,
            Character;
        for (i = 0; i < StringLength; i++) {
            Character = string[i];
            if (Character === ' ') Character = 'space';
            else if (Character === ',') Character = 'comma';
            else if (Character === '.') Character = 'dot';
            else if (Character === '!') Character = 'exclamation';
            StringEnclosure.append(['<div class="Characters ', family, '-', Character, ' ', family, '-', Character === Character.toUpperCase() ? 'Upper' : 'Lower', '" id="String-', index, '-', i, '" position="', i +
            1, '" style="opacity: 0.0;"></div>'].join(''));
        }
        StringDOMArray.push(StringEnclosure);
    }

    function LoadStrings(file) {
        $.get(URL + 'resources/' + file, function (xml) {
            var Strings = $(xml).find('string'),
                String;
            NumberOfStrings = Strings.length;
            Strings.each(function (i) {
                String = $(this);
                CreateString(i, String.text(), String.attr('id'), String.attr('scale'), String.attr('family'));
            });
        });
    }

    function AppendMenuImages() {
        $('.MenuImages').each(function () {
            var MenuImage = $(this),
                Fit = MenuImage.attr('fit') === 'true',
                Source = MenuImage.attr('src'),
                Elements = MenuImage.attr('for').split(','),
                Length = Elements.length,
                i;
            for (i = 0; i < Length; i++) {
                if (Fit) {
                    DYNAMIC_STYLES_DOM.append(Elements[i] + ' {background-image:url("' + Source + '");width:' + MenuImage[0].width + 'px;height:' + MenuImage[0].height + 'px;}');
                } else {
                    DYNAMIC_STYLES_DOM.append(Elements[i] + ' {background-image:url("' + Source + '");}');
                }
            }
        });
    }

    /**
     * @return {number}
     */
    function RandomTextEntranceAnimation() {
        return floor(random() * 25);
    }

    /**
     * @return {number}
     */
    function RandomTextExitAnimation() {
        return floor(random() * 25) + 100;
    }

    /**
     * @return {number}
     */
    function RandomTextEmphasisAnimation() {
        return floor(random() * 17) + 200;
    }

    $.fn.StopStringAnimation = function () {
        var String = $(this),
            stringAnimationID = parseInt(String.attr('stringAnimationID'), 10);
        String.velocity('stop').children().velocity('stop');
        clearTimeout(stringAnimationID);
        return String;
    };

    $.fn.ResetString = function () {
        var String = $(this),
            scale = parseFloat(String.attr('scale'));
        String.velocity('stop').CSS({
            opacity: 1,
            scale: scale,
            marginTop: 0,
            marginLeft: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0
        }).children().velocity('stop').CSS({
            opacity: 0,
            scale: 1,
            scaleX: 1,
            scaleY: 1,
            top: 0,
            left: 0,
            marginLeft: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0
        });
        return String;
    };

    $.fn.ResetStringOnlyCharacters = function (options) {
        options = $.extend({
            duration: 0,
            easing: 'linear',
            complete: undefined
        }, options);
        var String = $(this);
        String.children().velocity('stop').velocity({
            opacity: 1,
            scale: 1,
            scaleX: 1,
            scaleY: 1,
            top: 0,
            left: 0,
            marginLeft: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0
        }, options);
        return String;
    };

    $.fn.StringAnimation = function (options) {
        options = $.extend({
            animation: 0,
            loop: false,
            randomLoop: false,
            delay: 0,
            extent: 25,
            eachDelay: 50,
            eachExtent: 25,
            duration: 500,
            easing: 'linear',
            reset: false,
            complete: undefined
        }, options);
        var String = $(this),
            animation = options.animation,
            scale = parseFloat(String.attr('scale')),
            loop = options.loop,
            randomLoop = options.randomLoop,
            delay = options.delay,
            extent = options.extent,
            eachDelay = options.eachDelay,
            eachExtent = options.eachExtent,
            duration = options.duration,
            easing = options.easing,
            reset = options.reset,
            complete = options.complete,
            eachTransition = false,
            eachEmphasis = false,
            emphasis = false,
            beforeCSS,
            duringCSS,
            afterCSS,
            elementAfterOpacity = 1,
            stringAnimationID;
        switch (animation) {
            case 0:
                beforeCSS = {
                    opacity: 0.0
                };
                duringCSS = {
                    opacity: 1
                };
                break;
            case 1:
                eachTransition = true;
                beforeCSS = {
                    opacity: 0.0
                };
                duringCSS = {
                    opacity: 1
                };
                break;
            case 2:
                beforeCSS = {
                    opacity: 0.0,
                    scale: scale - 0.2
                };
                duringCSS = {
                    opacity: 1,
                    scale: scale
                };
                break;
            case 3:
                beforeCSS = {
                    opacity: 0.0,
                    scale: scale + 0.2
                };
                duringCSS = {
                    opacity: 1,
                    scale: scale
                };
                break;
            case 4:
                eachTransition = true;
                beforeCSS = {
                    opacity: 0.0,
                    scale: 0.2
                };
                duringCSS = {
                    opacity: 1,
                    scale: 1
                };
                break;
            case 5:
                eachTransition = true;
                beforeCSS = {
                    opacity: 0.0,
                    scale: 1.8
                };
                duringCSS = {
                    opacity: 1,
                    scale: 1
                };
                break;
            case 6:
                beforeCSS = {
                    opacity: 0.0,
                    marginTop: -extent
                };
                duringCSS = {
                    opacity: 1,
                    marginTop: 0
                };
                break;
            case 7:
                beforeCSS = {
                    opacity: 0.0,
                    marginTop: extent
                }
                duringCSS = {
                    opacity: 1,
                    marginTop: 0
                };
                break;
            case 8:
                beforeCSS = {
                    opacity: 0.0,
                    marginLeft: -extent
                };
                duringCSS = {
                    opacity: 1,
                    marginLeft: 0
                };
                break;
            case 9:
                beforeCSS = {
                    opacity: 0.0,
                    marginLeft: extent
                };
                duringCSS = {
                    opacity: 1,
                    marginLeft: 0
                };
                break;
            case 10:
                eachTransition = true;
                beforeCSS = {
                    opacity: 0.0,
                    top: -eachExtent
                };
                duringCSS = {
                    opacity: 1,
                    top: 0
                };
                break;
            case 11:
                eachTransition = true;
                beforeCSS = {
                    opacity: 0.0,
                    top: eachExtent
                };
                duringCSS = {
                    opacity: 1,
                    top: 0
                };
                break;
            case 12:
                eachTransition = true;
                beforeCSS = {
                    opacity: 0.0,
                    left: -eachExtent
                };
                duringCSS = {
                    opacity: 1,
                    left: 0
                };
                break;
            case 13:
                eachTransition = true;
                beforeCSS = {
                    opacity: 0.0,
                    marginLeft: -eachExtent
                };
                duringCSS = {
                    opacity: 1,
                    marginLeft: 0
                };
                break;
            case 14:
                eachTransition = true;
                beforeCSS = {
                    opacity: 0.0,
                    left: eachExtent
                };
                duringCSS = {
                    opacity: 1,
                    left: 0
                };
                break;
            case 15:
                eachTransition = true;
                beforeCSS = {
                    opacity: 0.0,
                    marginLeft: eachExtent
                };
                duringCSS = {
                    opacity: 1,
                    marginLeft: 0
                };
                break;
            case 16:
                eachTransition = true;
                beforeCSS = {
                    opacity: 0.0,
                    rotateX: 90
                };
                duringCSS = {
                    opacity: 1,
                    rotateX: 0
                };
                break;
            case 17:
                eachTransition = true;
                beforeCSS = {
                    opacity: 0.0,
                    rotateY: 90
                };
                duringCSS = {
                    opacity: 1,
                    rotateY: 0
                };
                break;
            case 18:
                eachTransition = true;
                beforeCSS = {
                    opacity: 0.0,
                    rotateZ: 90
                };
                duringCSS = {
                    opacity: 1,
                    rotateZ: 0
                };
                break;
            case 19:
                eachTransition = true;
                beforeCSS = {
                    opacity: 0.0,
                    rotateX: 90,
                    scaleX: 0.2,
                    scaleY: 0.2
                };
                duringCSS = {
                    opacity: 1,
                    rotateX: 0,
                    scaleX: 1,
                    scaleY: 1
                };
                break;
            case 20:
                eachTransition = true;
                beforeCSS = {
                    opacity: 0.0,
                    rotateY: 90,
                    scaleX: 0.2,
                    scaleY: 0.2
                };
                duringCSS = {
                    opacity: 1,
                    rotateY: 0,
                    scaleX: 1,
                    scaleY: 1
                };
                break;
            case 21:
                eachTransition = true;
                beforeCSS = {
                    opacity: 0.0,
                    rotateZ: 90,
                    scaleX: 0.2,
                    scaleY: 0.2
                };
                duringCSS = {
                    opacity: 1,
                    rotateZ: 0,
                    scaleX: 1,
                    scaleY: 1
                };
                break;
            case 22:
                eachTransition = true;
                beforeCSS = {
                    opacity: 0.0,
                    rotateX: 90,
                    scaleX: 1.8,
                    scaleY: 1.8
                };
                duringCSS = {
                    opacity: 1,
                    rotateX: 0,
                    scaleX: 1,
                    scaleY: 1
                };
                break;
            case 23:
                eachTransition = true;
                beforeCSS = {
                    opacity: 0.0,
                    rotateY: 90,
                    scaleX: 1.8,
                    scaleY: 1.8
                };
                duringCSS = {
                    opacity: 1,
                    rotateY: 0,
                    scaleX: 1,
                    scaleY: 1
                };
                break;
            case 24:
                eachTransition = true;
                beforeCSS = {
                    opacity: 0.0,
                    rotateZ: 90,
                    scaleX: 1.8,
                    scaleY: 1.8
                };
                duringCSS = {
                    opacity: 1,
                    rotateZ: 0,
                    scaleX: 1,
                    scaleY: 1
                };
                break;
            case 100:
                beforeCSS = {
                    opacity: 1
                };
                duringCSS = {
                    opacity: 0.0
                };
                break;
            case 101:
                eachTransition = true;
                duringCSS = {
                    opacity: 0.0
                };
                elementAfterOpacity = 0.0;
                break;
            case 102:
                beforeCSS = {
                    opacity: 1,
                    scale: scale
                };
                duringCSS = {
                    opacity: 0.0,
                    scale: scale + 0.2
                };
                break;
            case 103:
                beforeCSS = {
                    opacity: 1,
                    scale: scale
                };
                duringCSS = {
                    opacity: 0.0,
                    scale: scale - 0.2
                };
                break;
            case 104:
                eachTransition = true;
                duringCSS = {
                    opacity: 0.0,
                    scale: 1.8
                };
                elementAfterOpacity = 0.0;
                break;
            case 105:
                eachTransition = true;
                duringCSS = {
                    opacity: 0.0,
                    scale: 0.2
                };
                elementAfterOpacity = 0.0;
                break;
            case 106:
                beforeCSS = {
                    opacity: 1,
                    marginTop: 0
                };
                duringCSS = {
                    opacity: 0.0,
                    marginTop: -extent
                };
                break;
            case 107:
                beforeCSS = {
                    opacity: 1,
                    marginTop: 0
                };
                duringCSS = {
                    opacity: 0.0,
                    marginTop: extent
                };
                break;
            case 108:
                beforeCSS = {
                    opacity: 1,
                    marginLeft: 0
                };
                duringCSS = {
                    opacity: 0.0,
                    marginLeft: -extent
                };
                break;
            case 109:
                beforeCSS = {
                    opacity: 1,
                    marginLeft: 0
                };
                duringCSS = {
                    opacity: 0.0,
                    marginLeft: extent
                };
                break;
            case 110:
                eachTransition = true;
                duringCSS = {
                    opacity: 0.0,
                    left: -eachExtent
                };
                elementAfterOpacity = 0.0;
                break;
            case 111:
                eachTransition = true;
                duringCSS = {
                    opacity: 0.0,
                    marginLeft: -eachExtent
                };
                elementAfterOpacity = 0.0;
                break;
            case 112:
                eachTransition = true;
                duringCSS = {
                    opacity: 0.0,
                    left: eachExtent
                };
                elementAfterOpacity = 0.0;
                break;
            case 113:
                eachTransition = true;
                duringCSS = {
                    opacity: 0.0,
                    marginLeft: eachExtent
                };
                elementAfterOpacity = 0.0;
                break;
            case 114:
                eachTransition = true;
                duringCSS = {
                    opacity: 0.0,
                    top: -eachExtent
                };
                elementAfterOpacity = 0.0;
                break;
            case 115:
                eachTransition = true;
                duringCSS = {
                    opacity: 0.0,
                    top: eachExtent
                };
                elementAfterOpacity = 0.0;
                break;
            case 116:
                eachTransition = true;
                duringCSS = {
                    opacity: 0.0,
                    rotateX: 90
                };
                elementAfterOpacity = 0.0;
                break;
            case 117:
                eachTransition = true;
                duringCSS = {
                    opacity: 0.0,
                    rotateY: 90
                };
                elementAfterOpacity = 0.0;
                break;
            case 118:
                eachTransition = true;
                duringCSS = {
                    opacity: 0.0,
                    rotateZ: 90
                };
                elementAfterOpacity = 0.0;
                break;
            case 119:
                eachTransition = true;
                duringCSS = {
                    opacity: 0.0,
                    rotateX: 90,
                    scaleX: 1.8,
                    scaleY: 1.8
                };
                elementAfterOpacity = 0.0;
                break;
            case 120:
                eachTransition = true;
                duringCSS = {
                    opacity: 0.0,
                    rotateY: 90,
                    scaleX: 1.8,
                    scaleY: 1.8
                };
                elementAfterOpacity = 0.0;
                break;
            case 121:
                eachTransition = true;
                duringCSS = {
                    opacity: 0.0,
                    rotateZ: 90,
                    scaleX: 1.8,
                    scaleY: 1.8
                };
                elementAfterOpacity = 0.0;
                break;
            case 122:
                eachTransition = true;
                duringCSS = {
                    opacity: 0.0,
                    rotateX: 90,
                    scaleX: 0.2,
                    scaleY: 0.2
                };
                elementAfterOpacity = 0.0;
                break;
            case 123:
                eachTransition = true;
                duringCSS = {
                    opacity: 0.0,
                    rotateY: 90,
                    scaleX: 0.2,
                    scaleY: 0.2
                };
                elementAfterOpacity = 0.0;
                break;
            case 124:
                eachTransition = true;
                duringCSS = {
                    opacity: 0.0,
                    rotateZ: 90,
                    scaleX: 0.2,
                    scaleY: 0.2
                };
                elementAfterOpacity = 0.0;
                break;
            case 200:
                eachEmphasis = true;
                beforeCSS = {
                    scale: 1
                };
                duringCSS = {
                    scale: 1.3
                };
                afterCSS = {
                    scale: 1
                };
                break;
            case 201:
                eachEmphasis = true;
                beforeCSS = {
                    scale: 1
                };
                duringCSS = {
                    scale: 0.7
                };
                afterCSS = {
                    scale: 1
                };
                break;
            case 202:
                eachEmphasis = true;
                beforeCSS = {
                    top: 0
                };
                duringCSS = {
                    top: -eachExtent
                };
                afterCSS = {
                    top: 0
                };
                break;
            case 203:
                eachEmphasis = true;
                beforeCSS = {
                    top: 0
                };
                duringCSS = {
                    top: eachExtent
                };
                afterCSS = {
                    top: 0
                };
                break;
            case 204:
                eachEmphasis = true;
                beforeCSS = {
                    left: 0
                };
                duringCSS = {
                    left: -eachExtent
                };
                afterCSS = {
                    left: 0
                };
                break;
            case 205:
                eachEmphasis = true;
                beforeCSS = {
                    left: 0
                };
                duringCSS = {
                    left: eachExtent
                };
                afterCSS = {
                    left: 0
                };
                break;
            case 206:
                eachEmphasis = true;
                beforeCSS = {
                    marginLeft: 0
                };
                duringCSS = {
                    marginLeft: -eachExtent
                };
                afterCSS = {
                    marginLeft: 0
                };
                break;
            case 207:
                eachEmphasis = true;
                beforeCSS = {
                    marginLeft: 0,
                    rotateX: 0
                };
                duringCSS = {
                    marginLeft: -eachExtent,
                    rotateX: -180
                };
                afterCSS = {
                    marginLeft: 0,
                    rotateX: -360
                };
                break;
            case 208:
                eachEmphasis = true;
                beforeCSS = {
                    marginLeft: 0,
                    rotateY: 0
                };
                duringCSS = {
                    marginLeft: -eachExtent,
                    rotateY: -180
                };
                afterCSS = {
                    marginLeft: 0,
                    rotateY: -360
                };
                break;
            case 209:
                eachEmphasis = true;
                beforeCSS = {
                    marginLeft: 0,
                    rotateZ: 0
                };
                duringCSS = {
                    marginLeft: -eachExtent,
                    rotateZ: -180
                };
                afterCSS = {
                    marginLeft: 0,
                    rotateZ: -360
                };
                break;
            case 210:
                eachEmphasis = true;
                beforeCSS = {
                    marginLeft: 0
                };
                duringCSS = {
                    marginLeft: eachExtent
                };
                afterCSS = {
                    marginLeft: 0
                };
                break;
            case 211:
                eachEmphasis = true;
                beforeCSS = {
                    marginLeft: 0,
                    rotateX: 0
                };
                duringCSS = {
                    marginLeft: eachExtent,
                    rotateX: 180
                };
                afterCSS = {
                    marginLeft: 0,
                    rotateX: 360
                };
                break;
            case 212:
                eachEmphasis = true;
                beforeCSS = {
                    marginLeft: 0,
                    rotateY: 0
                };
                duringCSS = {
                    marginLeft: eachExtent,
                    rotateY: 180
                };
                afterCSS = {
                    marginLeft: 0,
                    rotateY: 360
                };
                break;
            case 213:
                eachEmphasis = true;
                beforeCSS = {
                    marginLeft: 0,
                    rotateZ: 0
                };
                duringCSS = {
                    marginLeft: eachExtent,
                    rotateZ: 180
                };
                afterCSS = {
                    marginLeft: 0,
                    rotateZ: 360
                };
                break;
            case 214:
                eachEmphasis = true;
                beforeCSS = {
                    rotateX: 0
                };
                duringCSS = {
                    rotateX: 180
                };
                afterCSS = {
                    rotateX: 360
                };
                break;
            case 215:
                eachEmphasis = true;
                beforeCSS = {
                    rotateY: 0
                };
                duringCSS = {
                    rotateY: 180
                };
                afterCSS = {
                    rotateY: 360
                };
                break;
            case 216:
                eachEmphasis = true;
                beforeCSS = {
                    rotateZ: 0
                };
                duringCSS = {
                    rotateZ: 180
                };
                afterCSS = {
                    rotateZ: 360
                };
                break;
            case 300:
                emphasis = true;
                beforeCSS = {
                    opacity: 1,
                    scale: scale
                };
                duringCSS = {
                    scale: scale + 0.2
                };
                break;
            case 301:
                emphasis = true;
                beforeCSS = {
                    opacity: 1,
                    scale: scale + 0.2
                };
                duringCSS = {
                    scale: scale
                };
                break;
        }
        if (eachEmphasis) {
            stringAnimationID = setTimeout(function () {
                var StringLength = parseInt(String.attr('length'), 10),
                    CharacterID = '#' + String.attr('id') + '-',
                    i;
                for (i = 0; i < StringLength; i++) {
                    String.find(CharacterID + i).CSS(beforeCSS).velocity(duringCSS, {
                        delay: i * eachDelay,
                        duration: duration,
                        easing: easing,
                        complete: function () {
                            $(this).velocity(afterCSS, {
                                duration: duration,
                                easing: easing,
                                complete: function () {
                                    if (parseInt($(this).attr('position'), 10) === StringLength) {
                                        if (loop) {
                                            if (randomLoop) {
                                                options.animation = RandomTextEmphasisAnimation();
                                                String.StringAnimation(options);
                                            } else {
                                                String.StringAnimation(options);
                                            }
                                        } else {
                                            if (typeof complete === 'function') {
                                                complete.call(String);
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    });
                }
            }, delay);
            String.attr('stringAnimationID', stringAnimationID);
        } else if (eachTransition) {
            stringAnimationID = setTimeout(function () {
                var StringLength = parseInt(String.attr('length'), 10),
                    CharacterID = '#' + String.attr('id') + '-',
                    i;
                for (i = 0; i < StringLength; i++) {
                    String.find(CharacterID + i).CSS(beforeCSS).velocity(duringCSS, {
                        delay: i * eachDelay,
                        duration: duration,
                        easing: easing,
                        complete: function () {
                            if (parseInt($(this).attr('position'), 10) === StringLength) {
                                if (reset) {
                                    String.ResetString();
                                }
                                if (typeof complete === 'function') {
                                    complete.call(String);
                                }
                            }
                        }
                    });
                }
            }, delay);
            String.attr('stringAnimationID', stringAnimationID);
        } else {
            String.CSS(beforeCSS, function () {
                String.children().css('opacity', 1);
                String.velocity(duringCSS, {
                    delay: delay,
                    duration: duration,
                    easing: easing,
                    complete: function () {
                        if (reset) {
                            String.ResetString();
                        }
                        if (typeof complete === 'function') {
                            complete.call(String);
                        }
                    }
                });
            });
        }
        return String;
    };

    /**
     * @return {string}
     */
    function GetStringByID(stringID) {
        var i = 0,
            n = NumberOfStrings,
            String;
        for (; i < n; i++) {
            String = StringDOMArray[i];
            if (String.attr('stringID') === stringID) {
                return String;
            }
        }
        return false;
    }

    function MenuEnterAnimation(start, end, complete) {
        var i = start;
        for (; i <= end; i++) {
            StringDOMArray[i].StopStringAnimation().PositionAt(HALF_CANVAS_HEIGHT + (i - start) * 75, 'center').StringAnimation({
                animation: FadeInEachScaleDownRotateZ,
                easing: BounceEasing,
                complete: i === end ? complete : undefined
            });
        }
    }

    function MenuExitAnimation(start, end, complete) {
        var i = start;
        for (; i <= end; i++) {
            StringDOMArray[i].StopStringAnimation().StringAnimation({
                animation: FadeOutEachScaleDownRotateZ,
                easing: BounceEasing,
                reset: true,
                complete: i === end ? complete : undefined
            });
        }
    }

    function MenuOptionsAnimation() {
        if (PreviousMenuOption >= 1 && PreviousMenuOption <= MaxMenuOption) {
            StringDOMArray[PreviousMenuOption].StopStringAnimation().ResetStringOnlyCharacters({
                duration: 1000,
                easing: BounceEasing
            }).StringAnimation({
                animation: ScaleDown,
                easing: BounceEasing
            });
        }
        StringDOMArray[CurrentMenuOption].StopStringAnimation().StringAnimation({
            animation: ScaleUp,
            easing: BounceEasing,
            complete: function () {
                StringDOMArray[CurrentMenuOption].StringAnimation({
                    animation: EachScaleUpDown,
                    easing: 'easeOutQuad',
                    delay: 2000,
                    loop: true
                });
            }
        });
    }

    function StartMenu(menu) {
        PreviousMenu = CurrentMenu;
        switch (menu) {
            case 0:
                CurrentMenu = 0;
                MaxMenuOption = 1;
                PreviousMenuOption = 0;
                if (PreviousMenu === 0) {
                    MenuKeysLoggerStarted = false;
                    MAIN_MENU_TITLE_DOM.InCenterWithCanvas(350, 174).CSS({
                        opacity: 1
                    }, function () {
                        SPLASH_SCREEN_FRAME_DOM.hide();
                    }).velocity({
                        scale: 0.7
                    }, {
                        duration: 500,
                        easing: BounceEasing
                    });
                    StringDOMArray[0].StopStringAnimation().PositionAt(HALF_CANVAS_HEIGHT + 175, 'center').StringAnimation({
                        animation: FadeInEachScaleDown,
                        easing: 'easeOutQuad',
                        complete: function () {
                            MenuKeysLoggerStarted = true;
                            StringDOMArray[0].StringAnimation({
                                animation: EachScaleUpDown,
                                easing: 'easeOutQuad',
                                delay: 2000,
                                loop: true,
                                randomLoop: true
                            });
                        }
                    });
                } else {
                    PreviousMenu = 0;
                    MenuExitAnimation(1, 3, function () {
                        MAIN_MENU_TITLE_DOM.velocity({
                            scale: 0.7,
                            marginTop: 0
                        }, {
                            duration: 500,
                            easing: BounceEasing,
                            complete: function () {
                                StartMenu(0);
                            }
                        });
                    });
                }
                break;
            case 1:
                CurrentMenu = 1;
                MaxMenuOption = 3;
                PreviousMenuOption = 0;
                if (PreviousMenu === 0) {
                    StringDOMArray[0].StopStringAnimation().StringAnimation({
                        animation: FadeOutEachScaleUp,
                        easing: 'easeOutQuad',
                        reset: true,
                        complete: function () {
                            MAIN_MENU_TITLE_DOM.velocity({
                                scale: 0.5,
                                marginTop: -125
                            }, {
                                duration: 500,
                                easing: BounceEasing
                            });
                            MenuEnterAnimation(1, 3, function () {
                                MenuOptionsAnimation();
                            });
                        }
                    });
                } else {

                }
                break;
        }
    }

    // Important Rendering and Collision Detection Functions...

    function UpdatePosition(i, deltaX, deltaY, theta) {
        var deltaCheck = deltaX !== 0 || deltaY !== 0,
            thetaCheck = theta !== 0,
            RotationCenter,
            Center;
        if (deltaCheck && thetaCheck) {
            RotationCenter = RotationCenterArray[i];
            Center = CenterArray[i];
            RotationCenter.X += deltaX;
            RotationCenter.Y += deltaY;
            RotationArray[i] += theta;
            if (RotationCenterEqualArray[i]) {
                Center.X += deltaX;
                Center.Y += deltaY;
            } else {
                Center.X += deltaX;
                Center.Y += deltaY;
                ShiftOrigin(Center, RotationCenter.X, RotationCenter.Y);
                RotatePoint(Center, theta);
                ShiftOrigin(Center, -RotationCenter.X, -RotationCenter.Y);
            }
            UpdateVertices(i, deltaX, deltaY, theta, true, true);
            UpdateBoundingRectangle(i);
        } else if (deltaCheck) {
            RotationCenter = RotationCenterArray[i];
            Center = CenterArray[i];
            RotationCenter.X += deltaX;
            RotationCenter.Y += deltaY;
            Center.X += deltaX;
            Center.Y += deltaY;
            UpdateVertices(i, deltaX, deltaY, theta, true, false);
            UpdateBoundingRectangle(i);
        } else if (thetaCheck) {
            RotationCenter = RotationCenterArray[i];
            Center = CenterArray[i];
            RotationArray[i] += theta;
            if (!RotationCenterEqualArray[i]) {
                ShiftOrigin(Center, RotationCenter.X, RotationCenter.Y);
                RotatePoint(Center, theta);
                ShiftOrigin(Center, -RotationCenter.X, -RotationCenter.Y);
            }
            UpdateVertices(i, deltaX, deltaY, theta, false, true);
            UpdateBoundingRectangle(i);
        }
    }

    /**
     * @return {boolean}
     */
    function BoundingRectanglesCollision(i, j) {
        var Of = BoundingRectangleArray[i],
            OfX = Of.Point.X,
            OfY = Of.Point.Y,
            With = BoundingRectangleArray[j],
            WithX = With.Point.X,
            WithY = With.Point.Y;
        return OfX < (WithX + With.Width) &&
            (OfX + Of.Width) > WithX &&
            OfY < (WithY + With.Height) &&
            (Of.Height + OfY) > WithY;
    }

    /**
     * @return {boolean}
     */
    function ProcessCollisionOfWith(i, j) {
        var SpriteOfShapeType = ShapeTypeArray[i],
            SpriteWithShapeType = ShapeTypeArray[j],
            CenterOf = CenterArray[i],
            CenterWith = CenterArray[j],
            VelocityOf = VelocityArray[i],
            Collision = BoundingRectanglesCollision(i, j);
        if (Collision) {
            if (DEBUGGING) {
                DrawRectangle(BoundingRectangleArray[i], '#5C6BC0');
                DrawRectangle(BoundingRectangleArray[j], '#304FFE');
            }
            switch (SpriteOfShapeType) {
                case SHAPES_CIRCLE:
                    switch (SpriteWithShapeType) {
                        case SHAPES_POLYGON:
                            var Radius = DimensionsArray[i].Radius,
                                VerticesWith = VerticesArray[j],
                                WithEdge = GetContactEdge(VerticesWith, CenterWith, CenterOf);
                            DrawPolygon(VerticesWith, '#ff0000');
                            if (WithEdge) {
                                var WithEdgeMagnitude = DimensionsArray[j].CeilSides[WithEdge.Index],
                                    WithEdgeSlope = Slope(WithEdge.Edge),
                                    IsInPolygon = InPolygon(VerticesWith, CenterOf),
                                    Delta;
                                WithEdge = WithEdge.Edge;
                                if (IsInPolygon) {
                                    CenterOf = GetContactPoint(VerticesWith, VelocityOf, CenterOf);
                                    CenterArray[i] = CenterOf;
                                    if (RotationCenterEqualArray[i]) {
                                        RotationCenterArray[i].X = CenterOf.X;
                                        RotationCenterArray[i].Y = CenterOf.Y;
                                    }
                                    Delta = Radius;
                                } else Delta = CircleSegmentIntersection(CenterOf, Radius, WithEdge, WithEdgeSlope, WithEdgeMagnitude);
                                if (Delta) {
                                    var CenterPosition = sign(EvaluateSegment(WithEdge, CenterOf, WithEdgeSlope)),
                                        COROf = CORArray[i],
                                        ComplementCOFWith = ComplementCOFArray[j];
                                    switch (WithEdgeSlope) {
                                        case 0:
                                            UpdatePosition(i, 0, CenterPosition * Delta, 0);
                                            VelocityOf.B *= VelocityOf.B >= MINIMUM_VELOCITY ? 0 : -COROf;
                                            VelocityOf.A *= abs(VelocityOf.A) <= MINIMUM_VELOCITY ? 0 : ComplementCOFWith;
                                            break;
                                        case Infinity:
                                            UpdatePosition(i, CenterPosition * Delta, 0, 0);
                                            VelocityOf.A *= abs(VelocityOf.A) <= MINIMUM_VELOCITY ? 0 : -(COROf * ComplementCOFWith);
                                            VelocityOf.B *= abs(VelocityOf.B) <= MINIMUM_VELOCITY ? 0 : ComplementCOFWith;
                                            break;
                                        default :
                                            var CenterWithPosition = sign(PositionOfPointSlope(WithEdgeSlope, WithEdge.P.X, WithEdge.P.Y, CenterWith.X, CenterWith.Y)),
                                                SlopeSign = sign(WithEdgeSlope),
                                                Theta = atan(WithEdgeSlope),
                                                Sin = sin(Theta),
                                                Cos = cos(Theta),
                                                DeltaX = CenterWithPosition * RoundDecimal(abs(Delta * Sin)),
                                                DeltaY = (CenterWithPosition !== SlopeSign ? 1 : -1) * RoundDecimal(abs(Delta * Cos)),
                                                A = VelocityArray[i].A,
                                                B = VelocityArray[i].B,
                                                A_ = (A * Sin - B * Cos) * ComplementCOFWith,
                                                B_ = -(A * Cos + B * Sin) * COROf;
                                            UpdatePosition(i, DeltaX, DeltaY, 0);
                                            if (DEBUGGING) {
                                                DrawText('SlopeSign : ' + SlopeSign, 10, 10, 20);
                                                DrawText('CenterOfPosition : ' + sign(PositionOfPointSlope(WithEdgeSlope, WithEdge.P.X, WithEdge.P.Y, CenterOf.X, CenterOf.Y)), 10, 30, 20);
                                                DrawText('CenterWithPosition : ' + sign(PositionOfPointSlope(WithEdgeSlope, WithEdge.P.X, WithEdge.P.Y, CenterWith.X, CenterWith.Y)), 10, 50, 20);
                                                DrawCircle(CenterOf, Radius, '#00ff00');
                                                //Pause();
                                            }
                                            VelocityArray[i].B = -SlopeSign * (B_ * Cos - A_ * Sin) * ComplementCOFWith;
                                            VelocityArray[i].A = -SlopeSign * (B_ * Sin + A_ * Cos) * COROf;
                                            break;
                                    }
                                    ContactArray[i] ^= true;
                                }
                            }
                            break;
                    }
                    break;
                //case SHAPES_POLYGON:
                //    var VerticesOf = VerticesArray[i];
                //    switch (SpriteWithShapeType) {
                //        case SHAPES_CIRCLE:
                //            break;
                //        case SHAPES_POLYGON:
                //            var VerticesWith = VerticesArray[j],
                //                WithEdge = GetContactEdge(VerticesWith, CenterWith, CenterOf),
                //                WithP = WithEdge.P,
                //                WithQ = WithEdge.Q,
                //                WithSlope = Slope(WithEdge),
                //                OfEdge = GetContactEdge(VerticesOf, CenterOf, CenterWith),
                //                Distance = DistanceFrom(WithEdge, OfEdge.P, WithSlope),
                //                DistanceWithP = DistanceFrom(WithP, CenterOf),
                //                DistanceWithQ = DistanceFrom(WithQ, CenterOf),
                //                CenterSegment = Segment(DistanceWithP > DistanceWithQ ? WithQ : WithP, CenterOf),
                //                CenterProjection = SegmentProjection(WithEdge, CenterSegment, WithSlope),
                //                QInSegment = PointInSegment(WithEdge, CenterProjection.Q);
                //            switch (SpriteWithType) {
                //                case TYPES_STATIC:
                //                    break;
                //                case TYPES_DYNAMIC:
                //                    break;
                //            }
                //            break;
                //    }
                //    break;
            }
        }
    }

    function ProcessCollisions() {
        var i = 0,
            k,
            j,
            p = PhysicsCount,
            n = NumberOfSprites;
        for (; i < p; i++) {
            k = PhysicsArray[i];
            for (j = 0; j < n; j++) if (k !== j) ProcessCollisionOfWith(k, j);
        }
    }

    function ProcessPhysics(delta) {
        var i = 0,
            j,
            n = PhysicsCount;
        for (; i < n; i++) {
            j = PhysicsArray[i];
            VelocityArray[j].B -= GRAVITY * delta / 1000;
            AngularVelocityArray[j] = -(VelocityArray[j].A / DimensionsArray[j].Radius) * 0.5;
            if (DEBUGGING) {
                DrawVector(CenterArray[j], VelocityArray[j], '#2196F3');
            }
        }
    }

    function ProcessPositions(delta) {
        var i = 0,
            j,
            deltaX = 0,
            deltaY = 0,
            n = DynamicCount;
        for (; i < n; i++) {
            j = DynamicArray[i];
            deltaX = delta * VelocityArray[j].A * CONVERSION_FACTOR;
            deltaY = delta * VelocityArray[j].B * CONVERSION_FACTOR;
            UpdatePosition(j, deltaX, deltaY, AngularVelocityArray[j] * delta);
        }
    }

    function ProcessInput() {
        var Faster = IsKeyPressed('Shift');
        if (IsKeyPressed('Left')) {
            VelocityArray[PLAYER].A -= VelocityArray[PLAYER].A <= -(Faster ? MAXIMUM_VELOCITY_FASTER : MAXIMUM_VELOCITY) ? 0 : (Faster ? VELOCITY_STEP_FASTER : VELOCITY_STEP);
        } else if (IsKeyPressed('Right')) {
            VelocityArray[PLAYER].A += VelocityArray[PLAYER].A >= (Faster ? MAXIMUM_VELOCITY_FASTER : MAXIMUM_VELOCITY) ? 0 : (Faster ? VELOCITY_STEP_FASTER : VELOCITY_STEP);
        }
        if (IsKeyPressed('Space')) {
            if (ContactArray[PLAYER]) VelocityArray[PLAYER].B = Faster ? 0.55 : 0.45;
        } else if (IsKeyPressed('Control')) {
            VelocityArray[PLAYER].B -= Faster ? 0.02 : 0.01;
        }
        if (IsKeyPressed('Z')) {
            TimeDelta = SLOWER_TIME_DELTA;
        } else if (IsKeyPressed('X')) {
            TimeDelta = FASTER_TIME_DELTA;
        } else {
            TimeDelta = DEFAULT_TIME_DELTA;
        }
    }

    function Draw(i, context) {
        var Image = TextureArray[i],
            Rotation = RotationArray[i],
            Opacity = OpacityArray[i],
            Scale = ScaleArray[i],
            Clip = ClipArray[i],
            HalfWidth = HalfSizeArray[i].Width,
            HalfHeight = HalfSizeArray[i].Height,
            Center = CenterArray[i],
            X = Center.X - HalfWidth,
            Y = OrdinateCorrection(Center.Y + HalfHeight);
        context.save();
        context.translate(X, Y);
        if (Opacity !== 1) context.globalAlpha = Opacity;
        if (Rotation) {
            context.translate(HalfWidth, HalfHeight);
            context.rotate(-Rotation);
            context.translate(-HalfWidth, -HalfHeight);
        }
        if (Scale !== 1) {
            context.translate(HalfWidth, HalfHeight);
            context.scale(Scale, Scale);
            context.translate(-HalfWidth, -HalfHeight);
        }
        if (Clip) {
            var CurrentFrame = CurrentFrameArray[i],
                ClipX = ClipXArray[i][CurrentFrame],
                ClipY = ClipYArray[i][CurrentFrame],
                Width = SizeArray[i].Width,
                Height = SizeArray[i].Height;
            context.drawImage(Image, ClipX, ClipY, Width, Height, 0, 0, Width, Height);
        }
        else context.drawImage(Image, 0, 0);
        if (DEBUGGING) {
            DrawCircle(RotationCenterArray[i], 1, '#00ffff');
            DrawCircle(Center, 1, '#ff0000');
        }
        context.restore();
    }

    function ClearScreen(context) {
        context.clearRect(0, 0, RESOLUTION_WIDTH, RESOLUTION_HEIGHT);
    }

    function DrawStaticSprites() {
        var i = 0,
            n = StaticCount;
        for (; i < n; i++) Draw(StaticArray[i], STATIC_CANVAS_CONTEXT);
    }

    function DrawDynamicSprites() {
        var i = 0,
            n = DynamicCount;
        for (; i < n; i++) Draw(DynamicArray[i], DYNAMIC_CANVAS_CONTEXT);
    }

    function Render() {
        ClearScreen(DYNAMIC_CANVAS_CONTEXT);
        if (DEBUGGING) {
            ClearScreen(DEBUGGING_CANVAS_CONTEXT);
        }
        DrawDynamicSprites();
    }

    function GameLoop(timestamp) {
        if (!Paused) {
            Render();
            ProcessPhysics(TimeDelta);
            ProcessPositions(TimeDelta);
            ContactArray[PLAYER] = false;
            ProcessCollisions();
            ProcessInput();
            timestamp -= TimeCorrection;
            LastTime = timestamp;
            UpdateFPS(timestamp);
            GameLoopID = RequestAnimationFrame(GameLoop);
        } else GameLoopID = RequestAnimationFrame(GameLoop);
    }

    function Pause() {
        if (GameStarted) {
            // Create entire pause menu.
            Paused = !Paused;
        } else if (MenuStarted) {
            Paused = true;
        }
    }

    function BindPauseOnFocusLoss() {
        wO.bind('blur', function () {
            Pause = true;
        });
    }

    function StartGameLoop() {
        GameStarted = true;
        // Rendering Static Canvas.
        ClearScreen(STATIC_CANVAS_CONTEXT);
        DrawStaticSprites();
        GameLoopID = RequestAnimationFrame(GameLoop);
    }

    function BrowserCompatibility() {
        return window.performance && window.performance.now || window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
    }

    function MenuKeysLogger() {
        dO.bind('keydown', function (event) {
            if (MenuKeysLoggerStarted) {
                var KeyIndex = GetKeyIndexByCode(event.keyCode),
                    KeyName;
                if (KeyIndex !== -1) {
                    KeyName = KeyNameArray[KeyIndex];
                }
            }
        }).bind('keyup', function (event) {
            if (MenuKeysLoggerStarted) {
                var KeyIndex = GetKeyIndexByCode(event.keyCode),
                    KeyName;
                if (KeyIndex !== -1) {
                    KeyName = KeyNameArray[KeyIndex];
                    switch (KeyName) {
                        case 'Up':
                            PreviousMenuOption = CurrentMenuOption;
                            if (CurrentMenuOption > 1) {
                                CurrentMenuOption--;
                            } else {
                                CurrentMenuOption = MaxMenuOption;
                            }
                            MenuOptionsAnimation();
                            break;
                        case 'Down':
                            PreviousMenuOption = CurrentMenuOption;
                            if (CurrentMenuOption < MaxMenuOption) {
                                CurrentMenuOption++;
                            } else {
                                CurrentMenuOption = 1;
                            }
                            MenuOptionsAnimation();
                            break;
                        case 'Enter':
                            if (CurrentMenu === 0) {
                                StartMenu(1);
                            }
                            break;
                        case 'Escape':
                            if (CurrentMenu !== PreviousMenu) {
                                StartMenu(PreviousMenu);
                            }
                            break;
                    }
                }
            }
        });
    }

    function GameKeysLogger() {
        dO.bind('keydown', function (event) {
            var KeyIndex = GetKeyIndexByCode(event.keyCode);
            if (KeyIndex !== -1) {
                KeyPressedArray[KeyIndex] = true;
                if (KeyTimeArray[KeyIndex] === 0) {
                    KeyTimeArray[KeyIndex] = GetTime();
                }
            }
        }).bind('keyup', function (event) {
            var KeyIndex = GetKeyIndexByCode(event.keyCode);
            if (KeyIndex !== -1) {
                KeyPressedArray[KeyIndex] = false;
                KeyTimeArray[KeyIndex] = 0;
            }
        });
    }

    function StopKeysLogger() {
        dO.unbind();
    }

    // ---------------------------------------------------------------------------------------//
    // Ending Engine, which manages the functions that are required for the game to run.
    // ---------------------------------------------------------------------------------------//

    // Starting Game.

    dO.ready(function () {
        InitializeGlobals();
        if (BrowserCompatibility()) {
            Debug('Your browser support all the HTML5 features that are required to play this game, be happy!', MESSAGE_SUCCESS);
            LoadKeys(function () {
                LoadSprites(1, function () {
                    GameKeysLogger();
                    StartGameLoop();
                });
                //StartSplashScreen();
                //LoadStrings('strings.xml');
                //LoadMenuImages('menu_images.xml', function () {
                //    AppendMenuImages();
                //    MenuKeysLogger();
                //    StopSplashScreen(function () {
                //        StartMenu(0);
                //    });
                //});
            });
        } else {
            Debug('Your browser doesn\'t support all the HTML5 features that are required to play this game, be sad!', MESSAGE_ERROR);
        }
    });

    wO.bind('keyup', function (event) {
        //console.log(event.keyCode);
        if (event.keyCode === 80) Pause();
    });

}(window, document, jQuery(window), jQuery(document), jQuery));