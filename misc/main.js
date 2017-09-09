/* 
    Created on : 04-Apr-2017, 10:36:28
    Author     : Tayfun Terzi
*/

author = 'Tayfun Terzi';

/* global d3 */

var sqWiHei = 700; //SVG and Body Frame Square Frame Size

var standA = ['/standalone', ''][1]

// Set clicked global measures
var ssymb = d3.select('body')
    .style('background-color', '#000000')
    .style('text-align', 'center')
    .append('svg');

var Gth = sqWiHei / 25;	//500 square px for svg

var Gtw=25*Gth, Geg=1/3*Gth;

//Set Intro Title Colours
var colpTitle = '#CCCCCC';
var colpKeys = ['#404040', '#E6E6E6'];

// ON-CLICK FUNCTION
var gRotate = false;
var gHeartB = true;
var gPathsO = false;

// Footer HeartBeat
ssymb.selectAll('.foots').data([0,1,2,3]).enter()
	.append('a').attr('xlink:href', '#')
	.append('text')
    .text('© ' + author)
	.attr('id', function (d) { return 'fftext' + d; })
    .attr('class', 'foots')
    .attr('text-anchor', 'middle')
    //.attr('font-size', Gth)
	.attr('font-size', Gth/2)
    .attr('fill', colpKeys[0])
	.attr('opacity', 0)
    .attr('transform',rotati({x:Gtw/2,y:Gtw-Gth+Geg},0,true))
	.on('click', function() {
		gFoldun(NaN);
		if (gPathsO) {
			Transpr(0)
			gPathsO = false
		} else {
			Transpr(.35)
			gPathsO = true
		}
		});
	
ssymb.select('#fftext0').attr('opacity', 1).call(blowSeq);

// Setting up unit-system
var sy = 1,         // y - unit
    ss = 1,         // yx - ratio
    sc = sy/7,      // condition
    sx = sy/ss,     // x plot limit
    sh = 2;         // viewbox

// Global svg measurements
var twidth  = Gtw;
var theight = Gtw;

ssymb.attr('viewBox', '0 0 ' + sqWiHei + ' ' + sqWiHei)
    .attr('preserveAspectRatio', 'xMinYMin slice')
    .attr('width', twidth).attr('height', theight)
    .style('overflow', 'hidden')
    .style('font-family', 'Arial, Helvetica, sans-serif')
	.attr('xmlns', 'http://www.w3.org/2000/svg')
	.attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
	;

// Line style properties
var gl = theight*0.008/sh+','+theight*0.012/sh,     // dashed
    gd = theight*0.003/sh+','+theight*0.003/sh,     // dotted
    gw = theight*0.002/sh+'',                       // stroke-width
    gn = '',                                        // stroke-width
    gr = theight*0.03/sh;                           // radius

// Rescaling functions
var sxas  = d3.scaleLinear()
        .domain([-sh*sx, sh*sx])
        .range([0,twidth]);

var syas  = d3.scaleLinear()
        .domain([sh*sy, -sh*sy])
        .range([0,theight]);

// Data for unclicked lines
var slined = {
    cngre:  {c: '#00fb35',      g: gn,          w: gw,
             p: [
                {x:0,           y:0,            a:theight*0.015/sh}
                ]
            },
    lgrey:  {c: '#bebebe',      g: gd,          w: gw,  
             p: [
                {x:0,           y:0,            a:{x:0,y:1}},
                {x:0,           y:0,            a:{x:1,y:0}}
                ]
            },
    lyell:  {c: '#006987',      g: gn,          w: 2*gw,
             p: [
                {x:-sy/2,       y:-sy/2,        a:{x:1,y:-1}},
                {x: sy/2,       y: sy/2,        a:{x:1,y:-1}},
                {x:-sy/2,       y: sy/2,        a:{x:1,y: 1}},
                {x: sy/2,       y:-sy/2,        a:{x:1,y: 1}}
                ]
            },
    lturq:  {c: '#2bcdcd',      g: gl,          w: gw,
             p: [
                {x:-sc/2,       y:-sc/2,        a:{x:1,y:-1}},
                {x: sc/2,       y: sc/2,        a:{x:1,y:-1}},
                {x:-sc/2,       y: sc/2,        a:{x:1,y: 1}},
                {x: sc/2,       y:-sc/2,        a:{x:1,y: 1}}
                ]
            },
    loran:  {c: '#f7ba05',      g: gl,          w: gw,
             p: [
                {x:-sc,         y:0,            a:{x:0,y:1}},
                {x: sc,         y:0,            a:{x:0,y:1}}
                ]
            },
    llgre:  {c: '#68ff00',      g: gl,          w: gw,
             p: [
                {x:0,           y:-sc*2,        a:{x:1,y:0}},
                {x:0,           y:-sc*3,        a:{x:1,y:0}}
                ]
            },
    ldgre:  {c: '#99ce58',      g: gl,          w: gw,
             p: [
                {x:0,           y:-sc+sy,       a:{x:1,y:0}}
                ]
            },
    lpurp:  {c: '#5b00ff',      g: gl,          w: gw,
             p: [
                {x: sc,         y:-sc*2,        a:{x:1,y:1}}
                ]
            },
    cpink:  {c: '#CE001C',      g: gn,          w: gw,
             p: [
                {x:-sc,         y:-sc+1,        a: gr},
                {x: (sc+sy)/2,  y:(-sc+sy)/2,   a: gr},       
                {x: (sc*3+sy)/2,y:(-sc*3+sy)/2, a: gr},       
                {x: sc,         y:-sc*2,        a: gr},       
                {x: (sc+sy)/2,  y: (sc-sy)/2,   a: gr},       
                {x:-(sc+sy)/2,  y: (sc-sy)/2,   a: gr}
                ]
            }
};  

// Path generator for slined
function vlini(p) {
    if (!isNaN(p.a)) {
        return 'M 0,0 m '+p.a+',0 h -'+2*p.a+ 
               ' a '+p.a+','+p.a+' 0 1,0 '+2*p.a+',0 a '+p.a+','+p.a+
               ' 0 1,0 -'+2*p.a+',0 m '+p.a+',-'+p.a+' v '+2*p.a;
    } else {
        return 'M 0,0'+' l '+-p.a.x*twidth+','+p.a.y*theight +
               ' M 0,0'+' l '+p.a.x*twidth +','+-p.a.y*theight;
            }
}

// Translate generator 
function rotati(d,deg,us) {
	//us = typeof us !== 'undefined' ? us : false;
	if (us===true) {
            return 'translate('+d.x+','+d.y+') rotate('+deg+')';
	} else if (us===false) {
            //return 'translate('+d.x+','+d.y+') rotate('+deg+')';
            return 'translate('+sxas(d.x)+','+syas(d.y)+') rotate('+deg+')';
        } else {
            return 'translate('+sxas(d.x)+','+syas(d.y)+') rotate('+deg+')';
        };
}

// Rotation
function roti(selection, dur) {
    if (gRotate===false) {return;};
    selection
    .transition()
    .duration(dur)
    .attr('transform',function(d) {return rotati(d,180);})
        .on('end', function() {if (gRotate===false) {return;};
            selection
            .transition()
            .duration(dur)
            .attr('transform',function(d) {return rotati(d,0);});
            setTimeout(function() {roti(selection, dur);}, (Math.random()+1)*dur);
        });
}

// Data for Radial Gradient
var rgradd = [
    {o:0,   c:'#ffffff'},
    {o:40,  c:'#ff0000'},
    {o:100, c:'#000000'}
];

ssymb.append("defs")
    .append("radialGradient")
        .attr("id", "radial-gradient")
        .selectAll('.rOffsets').data(rgradd).enter().append("stop")
            .attr('id', function(d,i) {return 'Rof'+i;})
            .attr('offset', function(d,i) {return d.o+'%';})
            .attr('stop-color', function(d,i) {return d.c;}); 


// Append unclicked lines
Object.keys(slined).forEach(function(ni) {
    ssymb.append('g').attr('id','D'+ni).selectAll('lines')
        .data(slined[ni].p)
        .enter()
            .append('path')
            .attr('class', ni)
            .attr('id', function(d,i) {return ni+i;})
            .attr('fill', 'none')
			.attr('opacity', 0)
            .attr('transform', function(d) {return rotati(d,0);})
            .attr('stroke', slined[ni].c)
            .attr('stroke-width', slined[ni].w)
            .attr('stroke-dasharray',slined[ni].g)
            .attr('d', function(d) {return vlini(d);});
});


// Data for text elements
var rGth = .5 * Gth, rGeg = 1 / 3 * rGth; // rGth = Main Text Size
var stextx = 2 * Gth + Geg;

var stexty = [
    Geg,
    Gth,
    Geg,
    2*Geg,
    Geg
];

var tab1 = 10*rGth;

var stextd = [
	[
		{t:['Work'],                   y:stexty[0], yend:0},
		{t:['<tspan style="font-weight:bold">Experience</tspan>'],         y:stexty[1], yend:0},
		{t: ['since Jun 2017<tspan x="' + tab1 + '">Citymapper</tspan>',
            '<tspan style="font-style: italic" x="' + tab1 + '"><tspan fill="#CE001C">City Operations Hero</tspan></tspan>',
			' ',
			'Oct 2015 - Oct 2016<tspan x="'+tab1+'">London School of Economics, Students’ Union (LSESU)</tspan>',
            '<tspan style="font-style: italic" x="'+tab1+'">Elected Graduate Research/<tspan fill="#CE001C">PhD Students’ Officer</tspan></tspan>',
            ' ',
            'Aug 2013 - Jul 2014<tspan x="' + tab1 + '">London School of Economics (LSE), Department of Statistics</tspan>',
            '<tspan style="font-style: italic" x="' + tab1 + '"><tspan fill="#CE001C">Graduate Teaching Assistant</tspan></tspan>',
            ' ',
            'Sep 2012 - Aug 2013<tspan x="' + tab1 + '">Goethe-University Frankfurt, Methodology Department</tspan>',
            '<tspan style="font-style: italic" x="' + tab1 + '">Graduate Teaching Assistant &amp; <tspan fill="#CE001C">Research Assistant</tspan></tspan>',
            ' ',
			'Jul 2012<tspan x="' + tab1 + '">Psychotherapy Practice Ullrich, Frankfurt</tspan>',
            '<tspan style="font-style: italic" x="' + tab1 + '"><tspan fill="#CE001C">Website Designer</tspan> for <a xlink:href="http://www.psychotherapie-ullrich.de" target="_blank" fill="'+colpTitle+'">psychotherapie-ullrich.de</a></tspan>',
            ' ',
            'since May 2010<tspan x="' + tab1 + '">Project PsyCONNECT</tspan>',
            '<tspan style="font-style: italic" x="' + tab1 + '"><tspan fill="#CE001C">Project Founder</tspan> &amp; Coordinator, Organisational Development</tspan>',
            ' ',
            'May 2009 - Jun 2010<tspan x="' + tab1 + '">Goethe-University, Differential Psychology &amp; Diagnostics</tspan>',
            '<tspan style="font-style: italic" x="' + tab1 + '">Research Assistant, IT Consultant, &amp; SSLC Representative</tspan>',
            ' ',
            'Apr 2009 - Sep 2010<tspan x="' + tab1 + '">Goethe-University, Federal Research Project in Primary Education</tspan>',
            '<tspan style="font-style: italic" x="' + tab1 + '">Research Assistant, IT Administrator</tspan>',
            ' '],
         y:stexty[2], yend:0},
		{t:['<tspan style="font-weight:bold">Internships</tspan>'], y: stexty[3], yend: 0 },
		{t:['Feb 2012 - Aug 2012<tspan x="' + tab1 + '">Aston Business School Birmingham</tspan>',
            '<tspan style="font-style: italic" x="' + tab1 + '">Research Assistant for the Work- &amp; Organisational Psychology Group</tspan>',
            ' ',
            'Jul 2011 - Oct 2011<tspan x="' + tab1 + '">PAConsulting Group (German HQ Frankfurt)</tspan>',
            '<tspan style="font-style: italic" x="' + tab1 + '"><tspan fill="#CE001C">Consultant in Business Transformation</tspan> for the Analytics Team in Paris</tspan>',
            ' ',
            'Aug 2010 - Oct 2010<tspan x="' + tab1 + '">Working Group Diagnostics and Evaluation Frankfurt</tspan>',
            '<tspan style="font-style: italic" x="' + tab1 + '">Design and Co-moderation of Job Assessment Workshops</tspan>',
            ' ',
            'May 2009 - Jun 2010<tspan x="' + tab1 + '">Goethe-University, Federal Research Project in Primary Education</tspan>',
            '<tspan style="font-style: italic" x="' + tab1 + '">Nationwide Group- and Individual Testing of Primary School Pupils</tspan>',
            ' '],
         y:stexty[4], yend:0}
        ],
	[
		{t:['Education'],              y:stexty[0], yend:0},
		{t:['<tspan style="font-weight:bold">Academia</tspan>'],         y:stexty[1], yend:0},
		{t:['Oct 2013 - Jun 2017<tspan x="'+tab1+'"><tspan style="font-weight:bold" fill="#CE001C">L</tspan>ondon <tspan style="font-weight:bold" fill="#CE001C">S</tspan>chool of <tspan style="font-weight:bold" fill="#CE001C">E</tspan>conomics and Political Science</tspan>',
            '<tspan style="font-style: italic" x="'+tab1+'" fill="#CE001C">PhD in Statistics</tspan>',
            ' ',
            'Aug 2011 - Aug 2013<tspan x="' + tab1 + '">Goethe-University Frankfurt</tspan>',
            '<tspan style="font-style: italic" x="' + tab1 + '" fill="#CE001C">MSc in Psychology (distinction)</tspan>',
			'<tspan x="' + tab1 + '">Specialised in Statistics and Social Research Methodology</tspan>',
            ' ',
            'Feb 2012 - Aug 2012<tspan x="' + tab1 + '">Aston Business School Birmingham</tspan>',
            '<tspan style="font-style: italic" x="' + tab1 + '">Work- and Organisational Psychology, Studies Abroad</tspan>',
            ' ',
            'Aug 2008 - Jun 2011<tspan x="' + tab1 + '">Goethe-University Frankfurt</tspan>',
            '<tspan style="font-style: italic" x="' + tab1 + '" fill="#CE001C">BSc in Psychology (first-class honours)</tspan>',
            ' '],
			y:stexty[2], yend:0},
		{t:['<tspan style="font-weight:bold">Skills</tspan>'],          y:stexty[3], yend:0},
		{t:['Didactics<tspan x="' + tab1 + '">Excellent in presentation techniques and workshop design/moderation</tspan>',
            '<tspan x="' + tab1 + '">Experience in advanced statistics course teaching</tspan>',
            ' ',
            'Statistics<tspan x="' + tab1 + '">Expertise in <tspan fill="#CE001C">(multivariate) analysis tools</tspan>,</tspan>',
            '<tspan x="' + tab1 + '">i.e., structural equation modelling with latent variables and</tspan>',
			'<tspan x="' + tab1 + '">cross-sectional data categorisation/prediction in <tspan fill="#CE001C">Big Data frameworks</tspan></tspan>',
			'<tspan x="' + tab1 + '">Professional programming skills in MPlus, <tspan style="font-weight:bold" fill="#CE001C">R</tspan>, SPSS, Stata, and Python</tspan>',
			'<tspan x="' + tab1 + '">Working knowledge in LISREL, MAPLE, and SAS</tspan>',
            ' ',
            'EDV Skills<tspan x="' + tab1 + '">All Microsoft Office applications, Windows XP/7/8, Mac OS,</tspan>',
            '<tspan x="' + tab1 + '">Adobe Dreamweaver, Photoshop, Premiere, Illustrator, and LaTex</tspan>',
            ' ',
            'Communication<tspan x="' + tab1 + '">Experienced in the acquisition of project funding,</tspan>',
			'<tspan x="' + tab1 + '">start-up coordination, and team work</tspan>',
            '<tspan x="' + tab1 + '">Experienced cross-hierarchical negotiator, panelist, and speaker</tspan>',
			'<tspan x="' + tab1 + '"></tspan>',
            ' ',
			'Languages<tspan x="' + tab1 + '"><tspan fill="#CE001C">German</tspan> (Mother Tongue)</tspan>',
            '<tspan x="' + tab1 + '"><tspan fill="#CE001C">English</tspan>: Excellent reading, writing, and verbal skills</tspan>',
			'<tspan x="' + tab1 + '">French: Good reading, basic writing, and basic verbal skills</tspan>',
			'<tspan x="' + tab1 + '">Turkish: Good reading, basic writing, and good verbal skills</tspan>',
            ' '],
			y:stexty[4], yend:0}
        ],
	[
		{t:['Research'],               y:stexty[0], yend:0},
		{t:['<tspan style="font-weight:bold">PhD in Statistics</tspan>'],         y:stexty[1], yend:0},
		{t:['New challenges concerning bias from measurement error have arisen due to the increasing',
			'use of paid participants: semi-plausible response patterns (SpRPs). SpRPs result when',
			'participants only superficially process the information of (online) experiments/',
			'questionnaires and attempt only to respond in a plausible way. This is due to the fact',
			'that participants who are paid are generally motivated by fast cash, and try to',
			'efficiently overcome objective plausibility checks and process other items only',
			'superficially, if at all. Thus, those participants produce not only useless but',
			'detrimental data, because they attempt to conceal their malpractice. The potential',
			'consequences are biased estimation and misleading statistical inference.',' ',
			'The statistical nature of specific invalid response strategies and applications are',
			'discussed, effectually deriving a meta-theory of response strategy, process, and',
			'plausibility. A new test measure to detect SpRPs was developed to accommodate data of',
			'survey type, without the need of a priori implemented mechanisms. Under a latent class',
			'latent variable framework, the effectiveness of the test measure was empirically and',
			'theoretically evaluated. The empirical evaluation is based on an experimental and',
			'online questionnaire study. These studies operate under a very well established',
			'psychological framework on five stable personality traits. The measure was',
			'theoretically evaluated through simulations. It was concluded that the measure is',
			'successfully discriminating between valid responders and invalid responders under',
			'certain conditions. Indicators for optimal settings of large discriminatory power were',
			'identified and limitations discussed.', ' ',
			'(available via: <a xlink:href="http://etheses.lse.ac.uk/3532/" target="_blank" fill="#CE001C">LSE Thesis Online</a>, doi: <a xlink:href="http://dx.doi.org/10.21953/lse.ujium54l0s14" target="_blank" fill="'+colpTitle+'">10.21953/lse.ujium54l0s14</a>, <a xlink:href="./safiles/Terzi_PhD_Thesis.pdf" target="_blank" fill="'+colpTitle+'">local: pdf</a>)'],
			y:stexty[2], yend:0},
		{t:['<tspan style="font-weight:bold">MSc Dissertation</tspan>'], y: stexty[3], yend: 0 },
		{t:['Mediation analysis has been crucial for explaining physiologic as well as psychological',
			'processes. However, standard regression model (SRM) is affected by the post-treatment',
			'selection bias (PtSB) caused by the violation of the no confounding assumption. With',
			'the potential values framework (PVF), it is easily proven that even with a randomised',
			'treatment X, the relationship of a mediator variable to the outcome is merely',
			'correlational in its nature and thus not causally interpretable. The aim is to',
			'introduce and evaluate a new approach: the constant direct effects model (CDEM). I seek',
			'to demonstrate the severity of the PtSB, by implementing a simulation study. In the',
			'case of SRM, the results suggest that if the no confounding variables assumption is',
			'violated, estimates are intolerably biased. I found severe type I error rates up to',
			'100% in population models with moderate unmeasured confounding. Simulation data',
			'analysed with CDEM show satisfactory accuracy regarding the estimate of interest.'],
			y:stexty[4], yend:0}
        ],
	[
		{t:['Engagement'],             y:stexty[0], yend:0},
		{t:['<tspan style="font-weight:bold">Student Representative</tspan>'],         y:stexty[1], yend:0},
		{t:['2015 - 2016<tspan x="'+tab1+'"><tspan fill="#CE001C">Elected</tspan> London School of Economics and Political Science</tspan>',
			'<tspan x="'+tab1+'">Students\' Union (<tspan fill="#CE001C">LSESU</tspan>) Postgraduate</tspan>',
			' <tspan x="'+tab1+'">Research/<tspan fill="#CE001C">PhD Students\' Officer</tspan></tspan>',
			' ',
			'since 2013<tspan x="'+tab1+'">Associate Member of the German Psychological Society (<tspan fill="#CE001C">DGPs</tspan>)</tspan>',
			' ',
			'2013 - 2016<tspan x="'+tab1+'">Student Representative for the </tspan>',
			' <tspan x="'+tab1+'">Staff-Student Liaison Committee (LSE, PhD, Statistics)</tspan>',
			' ',
			'01 Dec 2011<tspan x="'+tab1+'">Reviewer und Jury Member for the Distribution</tspan>',
			' <tspan x="'+tab1+'">of €250,000 eLearning Funds</tspan>',
			' ',
			'2011 - 2013<tspan x="'+tab1+'">Mentor to Graduate Students in need</tspan>',
			' <tspan x="'+tab1+'">for special Study Arrangements</tspan>',
			' ',
			'28 Sept 2011<tspan x="'+tab1+'"><tspan fill="#CE001C">Valedictorian</tspan> as Representative to all Psychology Students</tspan>',
			' <tspan x="'+tab1+'">at the Goethe-University (Bachelor, Diploma, &amp; PhD Graduates)</tspan>',
			' ',
			'Sept 2010<tspan x="'+tab1+'">Speaker and Representative for German Students</tspan>',
			' <tspan x="'+tab1+'"> at the DGPs Conference in Bremen</tspan>',
			' ',
			'2008 - 2013<tspan x="'+tab1+'"><tspan fill="#CE001C">Students\' Council</tspan>, Goethe-University Frankfurt</tspan>',
			' <tspan x="'+tab1+'">Elected Student Representative and</tspan>',
			' <tspan x="'+tab1+'">Member entitled to vote for</tspan>',
			' <tspan x="'+tab1+'">the Students\' Council,</tspan>',
			' <tspan x="'+tab1+'">the Faculty Council,</tspan>',
			' <tspan x="'+tab1+'">the BSc/MSc commission,</tspan>',
			' <tspan x="'+tab1+'">the Financial Distribution Board,</tspan>',
			' <tspan x="'+tab1+'">the BSc Examination Board</tspan>'
			],   y:stexty[2], yend:0},
		{t:['<tspan style="font-weight:bold" fill="#CE001C">PsyCONNECT</tspan>'],          y:stexty[3], yend:0},
		{t:['since May 2010<tspan x="'+tab1+'">Founder of the eLearning Project PsyCONNECT</tspan>', ' ',
			'Online Platform<tspan x="'+tab1+'"><a xlink:href="http://www.psyconnect-frankfurt.de" target="_blank" fill="#CE001C">http://www.psyconnect-frankfurt.de</a></tspan>'
			],
		y:stexty[4], yend:0}
        ],
	[
		{t:['Awards'],                 y:stexty[0], yend:0},
		{t:['<tspan style="font-weight:bold">Scholarships</tspan>'],         y:stexty[1], yend:0},
		{t:['2013 - 2016<tspan x="'+tab1+'">Economic &amp; Social Research Council (<tspan fill="#CE001C">ESRC</tspan>)</tspan>',
		' <tspan x="'+tab1+'">Advanced Quantitative Methods (<tspan fill="#CE001C">AQM</tspan>) Award</tspan>',
		' <tspan x="'+tab1+'">with full Stipend Scholarship</tspan>', ' ',
			'2011 - 2013<tspan x="'+tab1+'"><tspan fill="#CE001C">Germany-Scholarship</tspan> Award</tspan>',
			],   y:stexty[2], yend:0},
		{t:['<tspan style="font-weight:bold">Prices</tspan>'],          y:stexty[3], yend:0},
		{t:['Oct 2012<tspan x="'+tab1+'">Nominated for the <tspan fill="#CE001C">United Nations Habitat Future Communication Price</tspan></tspan>', ' ',
			'since 2010<tspan x="'+tab1+'">Receiver of further funding of approximately <tspan fill="#CE001C">€19,000</tspan> from</tspan>',
			' <tspan x="'+tab1+'">the Directorate of Psychology,</tspan>',
			' <tspan x="'+tab1+'">the Department of Social Psychology,</tspan>',
			' <tspan x="'+tab1+'">the interdisciplinary Group for University Didactic,</tspan>',
			' <tspan x="'+tab1+'">and the Students\' Union</tspan>',  ' ',
			'2013<tspan x="'+tab1+'">Winner of the Goethe-University Student-eLearning Fund (SeLF)</tspan>',
			' <tspan x="'+tab1+'">Price with <tspan fill="#CE001C">€4,500</tspan> grant</tspan>', ' ',
			'2011<tspan x="'+tab1+'">Winner of the SeLF Price with <tspan fill="#CE001C">€8,730</tspan> grant</tspan>', ' ',
			'2010<tspan x="'+tab1+'">Winner of the SeLF Price with <tspan fill="#CE001C">€10,000</tspan> grant</tspan>'
			],    y:stexty[4], yend:0}
        ],
	[
		{t:['Contact'],                y:stexty[0], yend:0},
		{t:['<tspan style="font-weight:bold" fill="#CE001C">' + author + ', PhD</tspan>'],         y:stexty[1], yend:0},
		{t:["°", " ", "°", " ",
			"°", " ", "°", " ", "°", " ", "°", " ", "°", " ", "°", " ",
			"°", " ", "°", " ", "°", " ", "°", " ", "°", "°"
			],   y:stexty[2], yend:0},
		{t:['<tspan style="font-weight:bold">Signature</tspan>'],          y:stexty[3], yend:0},
		{t:['<tspan fill="#CE001C">Psychologist</tspan> (BSc, MSc)',
			'PhD in <tspan fill="#CE001C">Statistics</tspan> (<tspan style="font-weight:bold" fill="#CE001C">L</tspan>ondon <tspan style="font-weight:bold" fill="#CE001C">S</tspan>chool of <tspan style="font-weight:bold" fill="#CE001C">E</tspan>conomics)',
			' ',
			'ESRC Advanced Quantitative Methods Award Holder',
			'Founding Member of Project PsyCONNECT',
			'Associate Member of the German Society for Psychology (DGPs)',
			' ',
			'Personal email: <tspan fill="#CE001C"><a xlink:href="mailto:public@TayfunTerzi.de">public@TayfunTerzi.de</a></tspan>',
			'Personal website: <tspan fill="#CE001C"><a xlink:href="https://TayfunTerzi.de">https://TayfunTerzi.de</a></tspan>',
			' '
			],    y:stexty[4], yend:0}
        ]
];

var nextEl=0;

d3.select('svg').selectAll('.sectionT')
    .data(stextd)
    .enter()
        .append('g')
            .attr('id',function(d,i) {
                nextEl=0;
                return 'SectG'+i;})
            .attr('class','pTexts')
            .attr('visibility','hidden')
			.attr('opacity', 0)
			.attr('transform',rotati({x:stextx,y:0},0,true))
            .each(function(d,i) {
                d3.select('#SectG'+i).selectAll('.sec'+i+'texts')
                    .data(d).enter()
                    .append('text')
                    .attr('font-size', rGth+'px')
                    .attr('fill', colpTitle)
                    .attr('class',function (d,i) {return 's'+i;})
                    //.attr('x',stextx)
                    .each(function(d,i) {
						d3.select(this).selectAll('.sth')
							.data(d.t).enter()
							.append('tspan')
							.attr('x',0)
							.attr('dy', rGth)
                            .html(function(d,i) {return d;})
							;
						})					
                    .attr('y',function(d,i) {
						if (i<1) {
						    d.yend = d.y + 1.5*rGth;
							nextEl = d.yend;
							return d.y;
						} else {
							d.y = nextEl + d.y;
							d.yend = d.y + this.getBBox().height + rGeg;
							nextEl = d.yend;
							return d.y;
						};
                    })
                    ;
            });

ssymb.selectAll('.pTexts .s0').style('opacity', '0');

function Transpr(opVal) {
	d3.keys(slined).forEach(function(ni) {
		d3.selectAll('.'+ni).data(slined[ni].p)
			.attr('opacity',opVal)
	});
}
                
// Data for Titles and Keywords
ssymb.append('g').attr('id','Ptitles')
    .selectAll('.gPageTitles')
    .data(slined.cpink.p).enter()
		.append('a')
			.attr('xlink:href', '#')
        .append('text')
            .attr('id',function(d,i) {return 'pTitle'+i;})
            .attr('class','pTitles')
            .style('font-weight','bold')
            .attr('fill', colpTitle)
            .attr('font-size',.7*Gth)
            .attr('transform',function(d,i) {
               return rotati({x:d.x,y:d.y},0,false);})
            .text(function(d,i) {return stextd[i][0].t;})
            .on('click', function(d,i) {gFoldun(i,false);})
            .on('mouseover', function(d,i) {
				d3.selectAll('.pTitles').attr('fill','#666666');
				d3.select(this).attr('fill', '#CE001C');
                d3.selectAll('#PKey' + i + ' .pKeywords').attr('fill', colpKeys[1]);
				d3.selectAll('.tate').attr('fill','#666666');
            })
            .on('mouseout', function(d,i) {
				d3.selectAll('.pTitles').attr('fill',colpTitle);
                //d3.select(this).attr('fill',colpTitle);
                d3.selectAll('#PKey'+i+' .pKeywords').attr('fill',colpKeys[0]);
				d3.selectAll('.tate').attr('fill',colpTitle);
            });

// Data for Clicked Lines
function reClined(pSel) {
	return(
	{
    cngre:  {p: [
                {x:0,           y:0,            rot:0}
                ]},
    lgrey:  {p: [
                {x:0,           y:0,            rot:0},
                {x:0,           y:0,            rot:0}
                ]},
    lyell:  {p: [
                {x:Gtw/2,      	y:1,            rot:-45},
                {x:Gtw-1,       y:stextd[pSel][stextd[pSel].length-1].yend/2,       	rot:45},
                {x:1,       	y:Gtw-1,       	rot:45},
                {x:1,       	y:stextd[pSel][stextd[pSel].length-1].yend/2,       	rot:-45}
                ]},
    lturq:  {p: [
                {x:Gtw/2,       y:stextd[pSel][1].y,           rot:-45},
                {x:Gtw/2,       y:stextd[pSel][1].yend,    rot:-45},
                {x:Gtw/2,       y:stextd[pSel][3].y,           rot: 45},
                {x:Gtw/2,       y:stextd[pSel][3].yend,    rot: 45}
                ]},
    loran:  {p: [
                {x:1.8*Gth,       y:stextd[pSel][stextd[pSel].length-1].yend/2, rot:0},
                {x:Gtw-Gth*1.8,   y:stextd[pSel][stextd[pSel].length-1].yend/2, rot:0}
                ]},
    llgre:  {p: [
                {x:Gtw/2,       y:Gtw-Geg-Gth,     rot:0},
                {x:Gtw/2,       y:Gtw-Geg, rot:0}
                ]},
    ldgre:  {p: [
                {x:Gtw/2,       y:2*Geg+Gth,          rot:0}
                ]},
    lpurp:  {p: [
                {x:Gtw/2,       y:Geg,    rot:45}
                ]},
    cpink:  {p: [
                {x:Gth,         y:3*Geg,        rot:0},
                {x:Gth,         y:6*Geg,        rot:0},
                {x:Gth,         y:9*Geg,        rot:0},
                {x:Gtw-Gth,     y:3*Geg,        rot:0},
                {x:Gtw-Gth,     y:6*Geg,        rot:0},
                {x:Gtw-Gth ,    y:9*Geg,        rot:0}
                ]}
	}
	)
	;
}

var clined = reClined(1);  

// Data for Keywords
var skeywd = [
    [
        {t:'PsyCONNECT',
        l:slined.lyell.p[1], r:45, dx:-9*Gth, dy:-Geg},
		{t:'Citymapper',
        l:slined.lyell.p[0], r:45, dx:-8*Gth, dy:-Geg},
        {t:'Python, R, Mplus, SPSS, Stata, HTML/CSS/Javascript, LaTeX, C++',
        l:slined.lyell.p[0], r:45, dx:0, dy:Gth},
        {t:'PAConsulting Group',
        l:slined.lyell.p[2], r:-45, dx:9.4*Gth, dy:-Geg}
    ],
    [
        {t:'Psychologist, MSc',
        l:slined.lyell.p[2], r:-45, dx:-Geg, dy:-Geg},
        {t:'Goethe University F.',
        l:slined.lyell.p[2], r:-45, dx:-Geg, dy:Gth-Geg},
        {t:'PhD in Statistics (LSE)',
        l:slined.ldgre.p[0], r:0, dx:6.5*Gth, dy:-.5*Geg},
        {t:'London School of Economics',
        l:slined.lturq.p[2], r:-45, dx:1.5*Geg, dy:-Geg}
    ],
    [
        {t:'Semi-plausible Response Patterns',
        l:slined.ldgre.p[0], r:0, dx:-6.5*Gth, dy:-.5*Geg},
        {t:'Mediation Analysis',
        l:slined.lyell.p[2], r:-45, dx:-9.5*Gth, dy:-Geg},
        {t:'Causal Inference',
        l:slined.lyell.p[2], r:-45, dx:-9.5*Gth, dy:Gth-Geg},
        {t:'Associate DGPs Member',
        l:slined.lyell.p[3], r:-45, dx:-9.5*Gth, dy:-Geg}
    ],
    [
        {t:'Student Council',
        l:slined.lgrey.p[1], r:0, dx:9.5*Gth, dy:-.5*Geg},
        {t:'Valedictorian',
        l:slined.lturq.p[3], r:-45, dx:2.2*Gth, dy:-Geg},
        {t:'Community Service',
        l:slined.lyell.p[1], r:45, dx:10.6*Gth, dy:Gth-Geg},
        {t:"LSESU PhD Officer",
        l:slined.lyell.p[0], r:45, dx:9*Gth, dy:-Geg}
    ],
    [
        {t:'UN Habitat',
        l:slined.lyell.p[3], r:-45, dx:-1.8*Gth, dy:Gth-Geg},
        {t:'ESRC AQM DTC Award',
        l:slined.lturq.p[1], r:45, dx:10*Gth, dy:-Geg},
        {t:'The Germany Scholarship',
        l:slined.lturq.p[0], r:45, dx:10*Gth, dy:-Geg}
    ],
    [
        {t:'public@TayfunTerzi.de',
        l:slined.lturq.p[3], r:-45, dx:-10*Gth, dy:-Geg},
        {t:'Munich, Frankfurt, London',
        l:slined.lturq.p[2], r:-45, dx:-10*Gth, dy:-Geg}
    ]
];


ssymb.selectAll('.PKeys').data(skeywd).enter().append('g')
        .attr('id',function(d,i) {return 'PKey'+i;})
        .attr('class','PKeys')
        .selectAll('.pKeywords').data(function(d) {return d;}).enter().append('text')
            .attr('class','pKeywords')
            .attr('dy',function(d,i) {return d.dy;})
            .attr('dx',function(d,i) {return d.dx;})
            .attr('text-anchor','middle')
            .attr('fill',colpKeys[0])
            .attr('font-size',Gth*.6)
            .text(function(d,i) {return d.t;})
            .attr('transform', function (d) { return rotati(d.l, d.r); });


// The Author Heartbeat
ssymb.selectAll('.tate').data([0,1,2,3]).enter()
	.append('a').attr('xlink:href', '#')
	.append('text')
    .text('Dr ' + author)
	.attr('id', function (d) { return 'tttext' + d; })
    .attr('class', 'tate pKeywords')
    .attr('text-anchor', 'middle')
    .attr('font-size', Gth)
    .attr('fill', colpTitle)
	.attr('opacity', 0)
    .attr('dy', -.7*Geg)
    .attr('dx', -13*Gth)
    .attr('transform', function (d) { return rotati(slined.lturq.p[0], 45); })
	.on('click', function() {gFoldun('');});
	
ssymb.select('#tttext0').attr('opacity', 1).attr('fill', colpTitle)
	.call(blowSeq);

function blow(whO, duR, foS) {
    d3.select(whO).transition().duration(duR)
	.attr('font-size', foS).attr('opacity',0);
}

var groW = 1.2;

function blowSeq() {
	if (gHeartB) {
	ssymb.select('#fftext0').attr('fill', colpKeys[0]);
    d3.selectAll('.tate').attr('opacity', 1).attr('font-size', Gth);
    d3.select('#tttext1').transition().duration(2000)
		.attr('font-size', groW * Gth).attr('opacity', 0)
        .on('end', function () { if (gHeartB===false) {return;}; blowSeq(); });
    blow('#tttext2', 1000, groW * Gth);
    blow('#tttext3', 500, groW * Gth);
	} else {
	d3.selectAll('.foots').attr('opacity', 1).attr('font-size', Gth/2).attr('fill', colpKeys[1]);
    d3.select('#fftext1').transition().duration(2000)
		.attr('font-size', groW * Gth/2).attr('opacity', 0)
        .on('end', function () { if (gHeartB===true) {return;}; blowSeq(); });
    blow('#fftext2', 1000, groW * Gth/2);
    blow('#fftext3', 500, groW * Gth/2);	
	}
}

// Circles when Fold
function isOdd(num) {return num%2;}

function cFold(pSel) {
    var oddC=-1; var eveC=-1; var mulP=7; var startP=2*Gth+2*Geg;

    d3.selectAll('.cpink').each(function(d,i) {
        if (i===pSel) {
            clined.cpink.p[i].x=Gth;
            clined.cpink.p[i].y=3*Geg;
        } else if (!isOdd(i)) {
            oddC=oddC+1;
            clined.cpink.p[i].x=Gth;
            clined.cpink.p[i].y=startP+oddC*mulP*Gth;
        } else {
            eveC=eveC+1;
            clined.cpink.p[i].x=Gtw-Gth;
            clined.cpink.p[i].y=startP+eveC*mulP*Gth;
        }
    ;});
}

// Fold Lines to Section
function Foldun(pSel) {
	clined = reClined(pSel); 
	cFold(pSel);
	Object.keys(clined).forEach(function(ni) {
        d3.selectAll('.'+ni).data(clined[ni].p)
            .transition().duration(1000)
                .attr('transform', function(d) {return rotati(d,d.rot,true);});
    });
    d3.select('#SectG'+pSel).transition().duration(2000)
        .attr('visibility','')
		.attr('opacity',1);
    d3.selectAll('.pKeywords').transition().duration(2000)
        .attr('opacity', 0)
        .on('end', function () { d3.select(this).attr('visibility', 'hidden') });
    d3.selectAll('.pTitles').transition().duration(1000)
        .attr('transform',function(d,i) {
            if (pSel===i) {
                return rotati({x:stextx,y:(stexty[0]+Gth)},0,true);
            } else {
                return rotati({x:clined.cpink.p[i].x,y:clined.cpink.p[i].y},90,true);
            }
    });
}

// Unfold Lines to Rotating Home
function unFoldun() {
    d3.keys(slined).forEach(function(ni) {
        d3.selectAll('.'+ni).data(slined[ni].p)
            .transition().duration(1000)
                .attr('transform',function(d) {return rotati(d,0,false);})
                .on('end', function() {
                    d3.selectAll('.'+ni)
                        .attr('transform',function(d) {return rotati(d,0);})
                        .call(roti, 3000);       
                });
    });
    d3.selectAll('.pTexts').transition().duration(500)
		.attr('opacity', 0)
        .on('end', function () { d3.select(this).attr('visibility', 'hidden') });
    d3.selectAll('.pKeywords').transition().duration(2000)
        .attr('visibility', '')
        .attr('opacity',1);
    d3.selectAll('.pTitles').transition().duration(1000)
        .attr('transform',function(d) {return rotati(d,0,false);});
}

// Global un/Folding when Clicked Function
function gFoldun(pSel) {
	unFoldun();
	if (isNaN(pSel)) {gRotate=false;gHeartB=true;
	} else if (pSel==='') {gRotate=true;gHeartB=true;
		} else {Foldun(pSel);gRotate=false;gHeartB=false;}
	blowSeq();
}

// Unfold on Footer Click
d3.select('#Tfooter').on('click', function() {gFoldun(NaN);});

// Profile Picture
var picheight =  stextd[5][2].yend - stextd[5][2].y + Geg

ssymb.select('#SectG5').append('image')
    .attr('width', function () { return (640 / 427 * picheight); })
    .attr('height', function () { return picheight; })
	.attr('xlink:href', '.'+standA+'/misc/WebSiteProfilePic.jpg')
    .attr('transform', function (d) {
		return rotati({x:0, y:(stextd[5][1].y + 2 * rGth)}, 0, true);
		});

// -----------------------------------------------------------------------------
