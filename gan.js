const videoElement = document.getElementById('video');
const canvas = document.getElementById('canvas');
const canvas2 = document.getElementById('canvas2');
const randomBtn = document.getElementById('random');
const ctx = canvas.getContext('2d');
var slider = document.getElementById("myRange");

//placeholder variable for user uploaded image
var imageData;
var output;
var model;

load_model()
//generate face from random input on button press
randomBtn.addEventListener('click', e => {inference(Array.from({length: 50}, () => Math.random()))});
//generates face based on input
function inference(input){
    input = tf.tensor(input,[1,50])
    output = model.predict(input)
    output = tf.squeeze(output,)
    output = output.mul(255)
    data = output.dataSync()
    //create a buffer array
    const buffer = new Uint8ClampedArray(64 * 64 * 4)
    //create an Image data var 
    im = new ImageData(64, 64);

    //map the values to the buffer
    var i = 0;
    for(var y = 0; y < 64; y++) {
      for(var x = 0; x < 64; x++) {
        var pos = (y * 64 + x) * 4;      // position in buffer based on x and y
        buffer[pos  ] = data[i]             // some R value [0, 255]
        buffer[pos+1] = data[i+1]           // some G value
        buffer[pos+2] = data[i+2]           // some B value
        buffer[pos+3] = 255;                // set alpha channel
        i+=3
      }
    }

    //set the buffer to the image data
    im.data.set(buffer)
    createImageBitmap(im).then(renderer => ctx.drawImage(renderer, 0,0, 256, 256))
}

//update model variable
function setvariable(net){
  model = net;
}

async function load_model(){
  const net = await tf.loadLayersModel('https://raw.githubusercontent.com/vee-upatising/Anime-DCGAN/master/model.json',strict=false).then(net => setvariable(net))
}

slider.oninput = function() {
    if(this.value ==1){
       inference([-0.5578047397389434,-0.5044193451979239,-0.31077649669211965,0.6329556677394392,0.7426145643953674,-0.7582667879024885,-0.47115889111235226,-0.5211051571754743,-1.0489945827921794,2.0601706811466487,-0.647420773523594,0.8774602250353382,0.01934909069773561,0.02985784960281858,1.2539186753655274,0.6792443498629255,0.5463351855854056,0.5496509748764348,-1.0882171755152752,-1.553087964722847,-0.9020058102032658,0.5149027748817163,-1.3452515675715346,0.1370801709475108,1.2245526469870998,0.8254144644038839,-0.8118097585673032,-0.043897196450690686,0.42270769194276936,-0.16749102014054779,-1.7816026867809718,0.22903487403252512,-1.109835621969236,0.7728115706904908,-2.110718553321486,-1.4570820404736071,0.31726478377051837,0.8216563986794322,0.05403446335872778,-2.075004204019851,0.14950301554600504,0.5502429081402301,-2.487291597891511,-0.7111575732247107,1.3999523903565583,1.8799344330153527,0.09794184041694182,0.8366210795643313,-1.114846792429303,1.5246581477517858])
    }
    if(this.value ==2){
       inference([-0.37951552700051905,-0.43298101558163454,-0.2602431911903186,0.6136399560178808,0.4395174043528153,-0.4834528366763536,-0.23336010214506317,-0.489225913095668,-0.8086356470488837,1.6748917305205004,-0.699544209423993,0.8551149567007981,-0.12653527984332644,-0.20730536483694884,1.2351721229829482,0.41403266148463547,0.6073620138986727,0.7882369188844095,-0.8261152535983836,-1.2496142471437217,-0.7256885804854133,0.5639396428156825,-1.1588346379592802,0.28612225872409724,0.9619831265348973,0.5517640704256448,-0.725169414791432,-0.09495197583197297,0.2699997022291185,-0.08493533067636813,-1.2924317819450946,0.2589771173940884,-0.8091934895440918,0.7341476728764987,-1.8213326850859841,-1.3483503319137111,0.1746746687007613,0.31866611986179016,-0.06213931793463815,-1.7847476809236724,-0.029499615000082413,0.3634274110158122,-1.890339469748211,-0.588506815251693,1.007264825616707,1.3403663195526332,0.30779859178681435,0.7190557187208774,-1.0676561079856577,1.541104647458316])
    }
    if(this.value ==3){
       inference([-0.2012263142620947,-0.3615426859653452,-0.2097098856885175,0.5943242442963225,0.13642024431026312,-0.2086388854502187,0.0044386868222259235,-0.45734666901586163,-0.568276711305588,1.2896127798943522,-0.751667645324392,0.8327696883662581,-0.2724196503843885,-0.44446857927671624,1.2164255706003688,0.14882097310634546,0.6683888422119397,1.0268228628923843,-0.5640133316814919,-0.9461405295645963,-0.5493713507675608,0.6129765107496488,-0.9724177083470258,0.43516434650068364,0.6994136060826946,0.2781136764474058,-0.6385290710155608,-0.14600675521325526,0.11729171251546772,-0.002379641212188477,-0.8032608771092175,0.2889193607556517,-0.5085513571189474,0.6954837750625067,-1.5319468168504824,-1.2396186233538151,0.03208455363100421,-0.18432415895585186,-0.1783130992280041,-1.4944911578274938,-0.20850224554616986,0.17661191389139425,-1.2933873416049109,-0.4658560572786752,0.6145772608768556,0.8007982060899135,0.5176553431566868,0.6014903578774233,-1.0204654235420125,1.5575511471648464])
    }
    if(this.value ==4){
       inference([-0.022937101523670345,-0.29010435634905585,-0.15917658018671643,0.575008532574764,-0.16667691573228904,0.06617506577591614,0.242237475789515,-0.42546742493605527,-0.3279177755622923,0.9043338292682039,-0.803791081224791,0.810424420031718,-0.4183040209254505,-0.6816317937164836,1.1976790182177894,-0.11639071527194456,0.7294156705252068,1.2654088069003588,-0.3019114097646003,-0.6426668119854708,-0.37305412104970836,0.662013378683615,-0.7860007787347715,0.58420643427727,0.43684408563049204,0.004463282469166829,-0.5518887272396896,-0.19706153459453754,-0.03541627719818308,0.08017604825199118,-0.31408997227334035,0.31886160411721504,-0.20790922469380302,0.6568198772485148,-1.2425609486149807,-1.1308869147939191,-0.1105055614387529,-0.687314437773494,-0.29448688052137,-1.204234634731315,-0.3875048760922573,-0.010203583233023727,-0.6964352134616107,-0.3432052993056574,0.22188969613700427,0.261230092627194,0.7275120945265594,0.4839249970339694,-0.9732747390983671,1.5739976468713768])
    }
    if(this.value ==5){
       inference([0.155352111214754,-0.21866602673276653,-0.10864327468491536,0.5556928208532056,-0.4697740757748412,0.3409890170020511,0.4800362647568041,-0.3935881808562489,-0.08755883981899659,0.5190548786420557,-0.85591451712519,0.7880791516971779,-0.5641883914665126,-0.918795008156251,1.1789324658352103,-0.38160240365023457,0.790442498838474,1.5039947509083338,-0.03980948784770866,-0.3391930944063455,-0.1967368913318559,0.7110502466175812,-0.599583849122517,0.7332485220538565,0.17427456517828954,-0.26918711150907226,-0.4652483834638184,-0.24811631397581982,-0.18812426691183393,0.16273173771617083,0.17508093256253687,0.34880384747877835,0.09273290773134124,0.6181559794345227,-0.953175080379479,-1.0221552062340231,-0.25309567650850995,-1.190304716591136,-0.41066066181473593,-0.9139781116351364,-0.5665075066383447,-0.19701908035744164,-0.09948308531831085,-0.22055454133263963,-0.17079786860284707,-0.2783380208355257,0.9373688458964318,0.3663596361905154,-0.9260840546547219,1.590444146577907])
    }
    if(this.value ==6){
       inference([0.33364132395317836,-0.1472276971164772,-0.058109969183114285,0.5363771091316473,-0.7728712358173935,0.615802968228186,0.7178350537240932,-0.36170893677644256,0.15280009592429922,0.13377592801590743,-0.908037953025589,0.7657338833626379,-0.7100727620075746,-1.1559582225960185,1.1601859134526311,-0.6468140920285246,0.8514693271517411,1.7425806949163083,0.22229243406918298,-0.03571937682722015,-0.020419661614003437,0.7600871145515474,-0.41316691951026263,0.8822906098304429,-0.08829495527391296,-0.5428375054873114,-0.3786080396879472,-0.2991710933571021,-0.3408322566254848,0.24528742718035051,0.6642518373984141,0.3787460908403416,0.3933750401564855,0.5794920816205307,-0.6637892121439772,-0.9134234976741271,-0.395685791578267,-1.693294995408778,-0.5268344431081019,-0.6237215885389578,-0.7455101371844322,-0.38383457748185956,0.49746904282498905,-0.0979037833596218,-0.5634854333426984,-0.8179061342982454,1.1472255972663044,0.24879427534706144,-0.8788933702110766,1.6068906462844372])
    }
    if(this.value ==7){
       inference([0.5119305366916027,-0.07578936750018783,-0.0075766636813132116,0.5170613974100888,-1.0759683958599455,0.8906169194543208,0.9556338426913822,-0.3298296926966362,0.3931590316675948,-0.2515030226102408,-0.960161388925988,0.7433886150280978,-0.8559571325486366,-1.3931214370357858,1.1414393610700517,-0.9120257804068146,0.9124961554650081,1.9811666389242832,0.4843943559860746,0.2677543407519054,0.15589756810384903,0.8091239824855136,-0.22674998989800832,1.0313326976070294,-0.3508644757261157,-0.8164878994655502,-0.29196769591207605,-0.3502258727383844,-0.4935402463391355,0.32784311664453014,1.153422742234291,0.4086883342019049,0.69401717258163,0.5408281838065386,-0.3744033439084755,-0.8046917891142311,-0.5382759066480242,-2.1962852742264203,-0.6430082244014679,-0.3334650654427791,-0.9245127677305196,-0.5706500746062776,1.0944211709682894,0.024746974613395922,-0.9561729980825497,-1.3574742477609647,1.357082348636177,0.13122891450360752,-0.8317026857674313,1.6233371459909676])
    }
    if(this.value == 7){
       inference([0.5119305366916028,-0.07578936750018783,-0.007576663681313213,0.5170613974100888,-1.0759683958599455,0.8906169194543208,0.9556338426913823,-0.3298296926966362,0.39315903166759486,-0.2515030226102409,-0.960161388925988,0.7433886150280978,-0.8559571325486367,-1.3931214370357858,1.1414393610700517,-0.9120257804068147,0.9124961554650081,1.981166638924283,0.48439435598607455,0.2677543407519052,0.1558975681038491,0.8091239824855136,-0.22674998989800824,1.0313326976070294,-0.3508644757261158,-0.8164878994655504,-0.29196769591207605,-0.3502258727383844,-0.49354024633913557,0.32784311664453014,1.1534227422342909,0.4086883342019049,0.6940171725816298,0.5408281838065386,-0.3744033439084755,-0.8046917891142311,-0.5382759066480242,-2.19628527422642,-0.6430082244014679,-0.33346506544277904,-0.9245127677305197,-0.5706500746062777,1.0944211709682894,0.024746974613395943,-0.9561729980825495,-1.357474247760965,1.357082348636177,0.13122891450360746,-0.8317026857674313,1.6233371459909676])
    }
    if(this.value == 8){
       inference([0.41065056900745295,-0.18668778931226232,-0.18211936713100255,0.43223090411416293,-0.9612991626823484,0.6113796177504227,0.670028666417527,-0.3978087540598649,0.35808531649839404,-0.06456014522701051,-0.9983809286134102,0.7740512149997995,-0.7349438710847849,-1.4121583988604824,0.7846299170264439,-0.6310334726965809,0.7903726250714463,1.704433776509681,0.3530568388659096,0.3073409428289456,0.10211105157314967,0.6356428411053924,-0.2683200028216577,0.538118809927977,-0.1465250361433944,-0.46549414214901147,-0.26318404268647566,-0.400425386987645,-0.34679582224425276,0.39872582059599787,0.9061741615463713,0.3463986149434266,0.43657034096301817,0.34320379437629744,-0.04171165077305705,-0.7607059314022386,-0.6468870554621933,-1.8495776238743151,-0.47547881928083924,-0.2912051399284703,-0.8350253018608464,-0.35264731747112543,0.8814680310047517,0.18671298692824767,-0.7305930777969007,-0.9890244983993843,1.0965545736211564,0.13587731911195824,-0.7701174233438117,1.6947441323773915])
    }
    if(this.value == 9){
       inference([0.3093706013233031,-0.2975862111243368,-0.3566620705806919,0.347400410818237,-0.8466299295047512,0.33214231604652455,0.3844234901436716,-0.46578781542309355,0.3230116013291932,0.12238273215621986,-1.0366004683008323,0.8047138149715011,-0.613930609620933,-1.4311953606851788,0.4278204729828361,-0.3500411649863473,0.6682490946778846,1.427700914095079,0.22171932174574466,0.34692754490598593,0.04832453504245024,0.4621616997252711,-0.30989001574530717,0.04490492224892462,0.05781440343932698,-0.11450038483247249,-0.23440038946087532,-0.45062490123690563,-0.20005139814937,0.4696085245474656,0.6589255808584518,0.2841088956849483,0.17912350934440657,0.14557940494605626,0.2909800423623614,-0.7167200736902463,-0.7554982042763623,-1.5028699735222104,-0.30794941416021054,-0.24894521441416156,-0.7455378359911733,-0.1346445603359731,0.668514891041214,0.34867899924309936,-0.505013157511252,-0.6205747490378039,0.8360267986061359,0.14052572372030903,-0.7085321609201921,1.7661511187638155])
    }
    if(this.value == 10){
       inference([0.20809063363915326,-0.4084846329364113,-0.5312047740303812,0.2625699175223112,-0.7319606963271541,0.0529050143426264,0.09881831386981632,-0.5337668767863222,0.2879378861599924,0.30932560953945026,-1.0748200079882544,0.8353764149432027,-0.49291734815708116,-1.4502323225098754,0.07101102893922828,-0.06904885727611354,0.546125564284323,1.150968051680477,0.09038180462557971,0.38651414698302633,-0.005461981488249196,0.28868055834514983,-0.35146002866895665,-0.44830896543012777,0.26215384302204836,0.23649337248406654,-0.20561673623527496,-0.5008244154861662,-0.0533069740544872,0.5404912284989333,0.4116770001705323,0.22181917642647,-0.07832332227420502,-0.05204498448418493,0.6236717354977799,-0.6727342159782539,-0.8641093530905313,-1.1561623231701055,-0.14042000903958185,-0.2066852888998528,-0.6560503701215001,0.08335819679917922,0.45556175107767616,0.5106450115579511,-0.2794332372256032,-0.25212499967622337,0.5754990235911155,0.14517412832865978,-0.6469468984965725,1.8375581051502394])
    }
    if(this.value == 11){
       inference([0.10681066595500338,-0.5193830547484858,-0.7057474774800706,0.17773942422638528,-0.617291463149557,-0.22633228736127164,-0.18678686240403908,-0.6017459381495509,0.2528641709907916,0.4962684869226806,-1.1130395476756765,0.8660390149149043,-0.37190408669322933,-1.469269284334572,-0.28579841510437953,0.2119434504341201,0.42400203389076124,0.8742351892658751,-0.04095571249458524,0.4261007490600667,-0.05924849801894863,0.11519941696502856,-0.3930300415926061,-0.9415228531091802,0.46649328260476974,0.5874871298006055,-0.1768330830096746,-0.5510239297354268,0.09343745004039555,0.6113739324504011,0.16442841948261278,0.1595294571679917,-0.3357701538928166,-0.24966937391442612,0.9563634286331983,-0.6287483582662614,-0.9727205019047004,-0.8094546728180008,0.027109396081046788,-0.16442536338554406,-0.5665629042518269,0.3013609539343315,0.24260861111413845,0.6726110238728028,-0.05385331693995443,0.11632474968535722,0.31497124857609493,0.14982253293701056,-0.5853616360729529,1.9089650915366634])
    }
    if(this.value == 12){
       inference([0.005530698270853507,-0.6302814765605603,-0.88029018092976,0.09290893093045938,-0.5026222299719598,-0.5055695890651697,-0.4723920386778945,-0.6697249995127795,0.21779045582159076,0.683211364305911,-1.1512590873630988,0.8967016148866059,-0.25089082522937745,-1.4883062461592684,-0.6426078591479873,0.49293575814435375,0.3018785034971996,0.5975023268512731,-0.1722932296147502,0.4656873511371071,-0.11303501454964807,-0.05828172441509272,-0.4346000545162556,-1.4347367407882325,0.6708327221874911,0.9384808871171444,-0.14804942978407423,-0.6012234439846874,0.2401818741352783,0.6822566364018687,-0.08282016120530677,0.0972397379095134,-0.5932169855114282,-0.4472937633446673,1.2890551217686168,-0.5847625005542689,-1.0813316507188695,-0.46274702246589605,0.19463880120167543,-0.12216543787123532,-0.47707543838215366,0.5193637110694838,0.029655471150600743,0.8345770361876546,0.17172660334569434,0.4847744990469378,0.054443473561074374,0.15447093754536134,-0.5237763736493333,1.9803720779230873])
    }
    if(this.value == 13){
       inference([-0.09574926941329631,-0.7411798983726348,-1.0548328843794492,0.00807843763453353,-0.3879529967943627,-0.784806890769068,-0.7579972149517497,-0.7377040608760081,0.18271674065238996,0.8701542416891415,-1.1894786270505209,0.9273642148583076,-0.12987756376552562,-1.507343207983965,-0.9994173031915952,0.7739280658545876,0.17975497310363786,0.320769464436671,-0.30363074673491514,0.5052739532141475,-0.1668215310803475,-0.231762865795214,-0.4761700674399051,-1.927950628467285,0.8751721617702125,1.2894746444336835,-0.11926577655847387,-0.651422958233948,0.38692629823016117,0.7531393403533364,-0.3300687418932262,0.034950018651035086,-0.8506638171300398,-0.6449181527749085,1.6217468149040353,-0.5407766428422766,-1.1899427995330385,-0.11603937211379112,0.3621682063223042,-0.07990551235692656,-0.38758797251248045,0.7373664682046361,-0.18329766881293708,0.9965430485025062,0.3973065236313431,0.8532242484085182,-0.20608430145394596,0.15911934215371212,-0.46219111122571366,2.0517790643095113])
    }
    if(this.value == 13){
       inference([-0.0957492694132963,-0.7411798983726348,-1.0548328843794492,0.008078437634533581,-0.3879529967943627,-0.7848068907690681,-0.7579972149517495,-0.7377040608760081,0.18271674065238994,0.8701542416891415,-1.1894786270505209,0.9273642148583076,-0.12987756376552564,-1.507343207983965,-0.9994173031915954,0.7739280658545874,0.17975497310363783,0.32076946443667104,-0.3036307467349151,0.5052739532141475,-0.16682153108034747,-0.23176286579521402,-0.4761700674399051,-1.9279506284672852,0.8751721617702124,1.2894746444336833,-0.11926577655847387,-0.651422958233948,0.3869262982301611,0.7531393403533364,-0.3300687418932261,0.034950018651035086,-0.8506638171300398,-0.6449181527749084,1.6217468149040353,-0.5407766428422766,-1.1899427995330385,-0.11603937211379128,0.36216820632230423,-0.07990551235692656,-0.38758797251248045,0.7373664682046362,-0.183297668812937,0.9965430485025062,0.39730652363134317,0.8532242484085181,-0.20608430145394602,0.15911934215371212,-0.46219111122571366,2.0517790643095113])
    }
    if(this.value == 14){
       inference([0.25850037500511236,-0.8199174283381429,-0.6402812564468656,0.18720341250244912,-0.5273848914681327,-0.6509590869122683,-0.7313815171411431,-0.5204814031208035,0.16843672870788337,0.5865652462383162,-1.2447286622755747,0.8339686590313652,0.23328403719851584,-1.438798333016032,-0.6459800829327977,0.89333226735661,-0.06607889115089605,0.424743294798264,-0.1754478313342308,0.39939110492810903,-0.2497978730712666,-0.0793648957354719,-0.5167210643723607,-1.4438730279519971,0.9393875915573997,1.055967430317362,-0.1708736718222903,-0.8701971615427934,0.28523636017006054,0.6145328794772262,-0.1275052928303243,0.09749046025159912,-0.7886104521844228,-0.2891079618037445,1.491861049989702,-0.3618598642238334,-1.01416677467534,-0.13879337634188504,0.21687728133233844,-0.1646988771575999,-0.4881836055330666,0.5189989263455097,0.06337470554553731,0.7179516051207282,0.3940243240591564,0.6289757591668798,-0.39172273399389185,0.05843066822496304,-0.08348832956577368,1.763007224684713])
    }
    if(this.value == 15){
       inference([0.612750019423521,-0.8986549583036509,-0.2257296285142819,0.36632838737036466,-0.6668167861419028,-0.5171112830554685,-0.7047658193305367,-0.3032587453655989,0.15415671676337678,0.3029762507874908,-1.2999786975006284,0.7405731032044227,0.5964456381625574,-1.370253458048099,-0.292542862674,1.0127364688586327,-0.31191275540542995,0.5287171251598569,-0.047264915933546536,0.2935082566420706,-0.33277421506218574,0.07303307432427023,-0.5572720613048161,-0.959795427436709,1.003603021344587,0.8224602162010408,-0.22248156708610672,-1.0889713648516386,0.18354642210995994,0.475926418601116,0.0750581562325775,0.16003090185216315,-0.726557087238806,0.06670222916741941,1.3619752850753688,-0.1829430856053903,-0.8383907498176417,-0.16154738056997883,0.07158635634237265,-0.24949224195827321,-0.5887792385536528,0.3006313844863831,0.3100470799040116,0.4393601617389503,0.3907421244869696,0.4047272699252414,-0.5773611665338376,-0.042258005703786045,0.2952144520941663,1.4742353850599146])
    }
    if(this.value == 16){
       inference([0.9669996638419297,-0.977392488269159,0.1888219994183018,0.5454533622382801,-0.8062486808156728,-0.3832634791986687,-0.6781501215199303,-0.08603608761039427,0.1398767048188702,0.01938725533666541,-1.3552287327256822,0.6471775473774803,0.9596072391265988,-1.301708583080166,0.060894357584797776,1.1321406703606551,-0.5577466196599637,0.6326909555214499,0.08091799946713774,0.18762540835603214,-0.4157505570531049,0.22543104438401237,-0.5978230582372717,-0.47571782692142084,1.067818451131774,0.5889530020847197,-0.27408946234992315,-1.3077455681604842,0.08185648404985935,0.3373199577250058,0.2776216052954793,0.22257134345272717,-0.664503722293189,0.42251242013858326,1.2320895201610353,-0.00402630698694717,-0.6626147249599432,-0.1843013847980726,-0.07370456864759317,-0.33428560675894653,-0.6893748715742389,0.0822638426272565,0.5567194542624859,0.16076871835717244,0.38745992491478287,0.180478780683603,-0.7629995990737835,-0.14294667963253513,0.6739172337541063,1.1854635454351161])
    }
    if(this.value == 17){
       inference([1.3212493082603385,-1.0561300182346671,0.6033736273508854,0.7245783371061957,-0.9456805754894428,-0.24941567534186893,-0.6515344237093238,0.1311865701448104,0.12559669287436362,-0.26420174011415987,-1.410478767950736,0.553781991550538,1.3227688400906403,-1.233163708112233,0.4143315778435954,1.2515448718626778,-0.8035804839144977,0.7366647858830428,0.209100914867822,0.0817425600699937,-0.498726899044024,0.3778290144437545,-0.6383740551697272,0.008359773593867192,1.1320338809189614,0.35544578796839843,-0.3256973576137396,-1.5265197714693293,-0.019833454010241225,0.1987134968488956,0.4801850543583811,0.2851117850532912,-0.6024503573475721,0.7783226111097472,1.102203755246702,0.17489047163149596,-0.48683870010224484,-0.20705538902616638,-0.21899549363755894,-0.4190789715596199,-0.7899705045948251,-0.13610369923187005,0.8033918286209603,-0.11782272502460556,0.3841777253425961,-0.0437697085580353,-0.9486380316137293,-0.2436353535612842,1.0526200154140462,0.8966917058103179])
    }
    if(this.value == 18){
       inference([1.6754989526787472,-1.1348675482001753,1.0179252552834692,0.9037033119741112,-1.0851124701632129,-0.11556787148506908,-0.6249187258987174,0.34840922790001505,0.11131668092985705,-0.5477907355649851,-1.4657288031757898,0.4603864357235955,1.6859304410546818,-1.1646188331443001,0.7677687981023931,1.3709490733647005,-1.0494143481690315,0.8406386162446358,0.3372838302685063,-0.024140288216044747,-0.5817032410349432,0.5302269845034966,-0.6789250521021828,0.4924373741091552,1.1962493107061487,0.12193857385207729,-0.377305252877556,-1.7452939747781748,-0.1215233920703418,0.06010703597278544,0.6827485034212829,0.34765222665385526,-0.5403969924019552,1.1341328020809112,0.9723179903323689,0.3538072502499391,-0.31106267524454645,-0.22980939325426014,-0.3642864186275247,-0.5038723363602933,-0.8905661376154113,-0.3544712410909966,1.0500642029794345,-0.39641416840638355,0.3808955257704093,-0.26801819779967373,-1.1342764641536751,-0.3443240274900333,1.4313227970739861,0.6079198661855196])
    }
    if(this.value == 19){
       inference([2.029748597097156,-1.2136050781656833,1.4324768832160528,1.0828282868420267,-1.224544364836983,0.018279932371730645,-0.598303028088111,0.5656318856552196,0.09703666898535047,-0.8313797310158106,-1.5209788384008436,0.36699087989665313,2.049092042018723,-1.096073958176367,1.121206018361191,1.490353274866723,-1.2952482124235654,0.9446124466062287,0.46546674566919055,-0.1300231365020832,-0.6646795830258623,0.6826249545632388,-0.7194760490346382,0.9765149746244435,1.260464740493336,-0.11156864026424396,-0.42891314814137244,-1.96406817808702,-0.22321333013044242,-0.07849942490332484,0.8853119524841847,0.41019266825441925,-0.47834362745633824,1.489942993052075,0.8424322254180355,0.5327240288683822,-0.13528665038684795,-0.2525633974823539,-0.5095773436174906,-0.5886657011609665,-0.9911617706359974,-0.5728387829501232,1.2967365773379087,-0.6750056117881613,0.3776133261982225,-0.49226668704131205,-1.319914896693621,-0.44501270141878235,1.810025578733926,0.31914802656072117])
    }
}


