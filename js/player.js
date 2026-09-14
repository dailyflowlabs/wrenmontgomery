/**
 * WREN MONTGOMERY — Official Audio Engine & Visualizer
 * Debut Album: Sweet Tea & Gasoline (12 Tracks)
 * HTML5 Audio + Web Audio API Canvas Visualizer
 */

(function () {
  'use strict';

  const tracks = [
  {
    "id": "track-01-rodeo",
    "title": "Ain't My First Rodeo (Just My First Clown)",
    "subtitle": "Lead Single \u2022 Studio Master",
    "tag": "Lead Single",
    "duration": "3:27",
    "src": "music/01-aint-my-first-rodeo.mp3",
    "artwork": "music/01-aint-my-first-rodeo.jpg",
    "lyrics": "[Intro]\n[Driving Stomp-Clap Rhythm & Fast Telecaster Riff]\nYeah, my mama told me watch out for the boots and the hat...\nShe just forgot to mention what was under all that.\n\n[Verse 1]\nYou rolled up in a lifted two-tone Chevrolet\nSpittin' lines smoother than sweet tea in May\nTalkin' big about your ranch out in Abilene\nBoy, you sold a fairytale right out of a magazine\nBought my drink, pulled my chair, talked a real good game\n'Til I caught you two-steppin' with another name.\n\n[Pre-Chorus]\nNow you're textin' me apologies at two in the morn?\nHoney, save your breath, that saddle\u2019s already worn.\n\n[Chorus]\nAin't my first rodeo, just my first clown!\nThought you\u2019d take my little heart and turn it upside down!\nYou\u2019re all buckle, no belt, all hat and no herd,\nTalkin' ninety miles an hour, not a single true word!\nSo pack up your circus and take it out of town\u2014\nYeah, it ain't my first rodeo,\nJust my first clown!\n[Fast Fiddle Breakdown]\n\n[Verse 2]\nLeft your cheap cologne all over my passenger seat\nNow you're tellin' your buddies you swept me off my feet\nGo ahead and talk, boy, make yourself feel tall\nYou\u2019re a ten-dollar haircut against a brick wall.\nI ain't crying in my pillow, I ain't missin' your calls\nI\u2019m out kickin' up sawdust in these cedar halls!\n\n[Pre-Chorus]\nIf you think I\u2019m comin' back, you got it all confused\nI don't look good in tears, and baby, I don't lose.\n\n[Chorus]\n'Cause it ain't my first rodeo, just my first clown!\nThought you\u2019d take my little heart and turn it upside down!\nYou\u2019re all buckle, no belt, all hat and no herd,\nTalkin' ninety miles an hour, not a single true word!\nSo pack up your circus and take it out of town\u2014\nYeah, it ain't my first rodeo,\nJust my first clown!\n\n[Bridge]\n[Acoustic Strum and Claps Only]\n(One, two, three, let's go!)\nI\u2019ve seen wild horses, I\u2019ve seen bulls break loose\nAin't nothin' quite as reckless as a cowboy with an excuse!\n(Hey! Woo!)\n\n[Guitar and Fiddle Solo]\n\n[Chorus]\nAin't my first rodeo, just my first clown!\nThought you\u2019d take my little heart and turn it upside down!\nYou\u2019re all buckle, no belt, all hat and no herd,\nTalkin' ninety miles an hour, not a single true word!\nSo pack up your circus and take it out of town\u2014\nYeah, it ain't my first rodeo,\nJust my first clown!\n\n[Outro]\nYeah, just my first clown.\nHonk your horn on the way out, baby!\n[Laugh & Final Fiddle Stab]"
  },
  {
    "id": "track-02-carburetor-heart",
    "title": "Carburetor Heart",
    "subtitle": "Album Track \u2022 Country-Rock Swagger",
    "tag": "Fan Favorite",
    "duration": "3:30",
    "src": "music/02-carburetor-heart.mp3",
    "artwork": "music/02-carburetor-heart.jpg",
    "lyrics": "[Intro]\n[Wrench clank sound effect, revving engine, heavy stomp-clap beat and crunchy slide guitar]\nYou think you're pretty handy with that toolbox smile...\nHoney, you haven't seen under the hood in a while.\n\n[Verse 1]\nYou brought your daddy's pickup down to Miller's creek\nSmilin' like you owned the county, runnin' on a streak\nTold me my transmission looked a little out of line\nSaid you'd take me into town and make my engine shine\nWell, I took apart my first small block when I was seventeen\nBoy, I know the difference between steel and gasoline.\n\n[Pre-Chorus]\nYou're pumpin' all this smoke tryin' to stall the machine,\nDon't tap the throttle if you don't know what it means!\n\n[Chorus]\nYou can't tune me up just to leave me in park!\nCan't strike a match if you don't got a spark!\nYou're revvin' in neutral, blowin' hot air,\nLookin' in the mirror just to fix your hair!\nI run high-octane, baby, right from the start\u2014\nYeah, you're tryin' to fix a carburetor heart!\n[Crunchy Telecaster Solo & Whistle]\n\n[Verse 2]\nNow you\u2019re stranded on the shoulder with your hood propped high\nCryin' to your buddies 'bout a girl too dry\nI pulled up in my work boots, ratchet in my hand\nShowed you how to turn a wrench and follow a command\nFixed your alternator while you stood there lookin' dazed\nLeft you in a cloud of dust and Leiper's county haze!\n\n[Pre-Chorus]\nIf you wanted something simple you should bought a toy car,\n'Cause honey, this motor's built for runnin' real far!\n\n[Chorus]\nYou can't tune me up just to leave me in park!\nCan't strike a match if you don't got a spark!\nYou're revvin' in neutral, blowin' hot air,\nLookin' in the mirror just to fix your hair!\nI run high-octane, baby, right from the start\u2014\nYeah, you're tryin' to fix a carburetor heart!\n\n[Bridge]\n[Bass and Kick Drum Breakdown with Slide Guitar Whispers]\nI don't need no backyard mechanic tellin' me I'm broken.\nMy gears are turnin' just fine...\nAnd this ignition?\nAin't yours to ignite!\n(Hit it boys!)\n\n[Guitar Solo - Blistering Southern Rock Lick]\n\n[Chorus]\nYou can't tune me up just to leave me in park!\nCan't strike a match if you don't got a spark!\nYou're revvin' in neutral, blowin' hot air,\nLookin' in the mirror just to fix your hair!\nI run high-octane, baby, right from the start\u2014\nYeah, you're tryin' to fix a carburetor heart!\n\n[Outro]\nYeah, keep pushin' that pedal, boy.\nCarburetor heart.\nEat my dust!\n[Engine rev and laughing fadeout]"
  },
  {
    "id": "track-03-lipstick-solo-cup",
    "title": "Lipstick on a Solo Cup",
    "subtitle": "Viral Line-Dance \u2022 Tailgate Smash",
    "tag": "Viral Anthem",
    "duration": "3:21",
    "src": "music/03-lipstick-on-a-solo-cup.mp3",
    "artwork": "music/03-lipstick-on-a-solo-cup.jpg",
    "lyrics": "[Intro]\n[Acoustic banjo bounce, stomps, claps, and girls laughing in the background]\n(One, two, pour it up!)\nFive o'clock on a Friday tailgate...\nYeah, somebody cue the fiddle!\n\n[Verse 1]\nSaw your tailgate parked on the gravel road\nHeard you came alone with a heavy load\nCryin' to the boys 'bout what you lost\nCountin' up the quarters of the breakup cost\nWell, look over here across the pasture grass\nI got a cherry red smile and a full plastic glass!\n\n[Pre-Chorus]\nYou thought I\u2019d be home drinkin' Chardonnay?\nBaby, that's not how we do it down in TN!\n(Let's go!)\n\n[Chorus]\nLeft your memory with the lipstick on a Solo cup!\nCrank the stereo and throw both hands right up!\nAin't waitin' round for a text you'll regret,\nGot thirty-two friends and the night's young yet!\nDust on my boots, cherry shade on my rim,\nBoy, I\u2019m drinkin' to me, not thinkin' 'bout him!\nYeah, leavin' your memory\nWith lipstick on a Solo cup!\n[Bouncy Banjo & Fiddle Hook]\n\n[Verse 2]\nDJ played that song you used to hate\nNow the whole back row's line-dancin' at the gate\nScuff mark on my Lucchese boot\nMakin' sweet tea whiskey taste like forbidden fruit\nYou\u2019re starin' from the shadows by the bonfire light\nWonderin' why my smile is shinin' so damn bright!\n\n[Pre-Chorus]\nDid you really think a broken promise made me break?\nHoney, that's the easiest laugh I ever made!\n\n[Chorus]\nLeft your memory with the lipstick on a Solo cup!\nCrank the stereo and throw both hands right up!\nAin't waitin' round for a text you'll regret,\nGot thirty-two friends and the night's young yet!\nDust on my boots, cherry shade on my rim,\nBoy, I\u2019m drinkin' to me, not thinkin' 'bout him!\nYeah, leavin' your memory\nWith lipstick on a Solo cup!\n\n[Bridge]\n[Stomp-Clap Rhythm Only, Whispered and Cheeky]\nRed rim, ice cold, let the story unfold.\nYou had your chance, boy, now you're just old news.\n(Hey! Turn it up!)\n\n[Fiddle & Banjo Duel Breakdown]\n\n[Chorus]\nLeft your memory with the lipstick on a Solo cup!\nCrank the stereo and throw both hands right up!\nAin't waitin' round for a text you'll regret,\nGot thirty-two friends and the night's young yet!\nDust on my boots, cherry shade on my rim,\nBoy, I\u2019m drinkin' to me, not thinkin' 'bout him!\nYeah, leavin' your memory\nWith lipstick on a Solo cup!\n\n[Outro]\nRed shade number nine, baby!\nRight on the rim.\nCheers!\n[Cup drop and banjo flourish]"
  },
  {
    "id": "track-04-sunday-apology",
    "title": "Sunday Morning Apology",
    "subtitle": "Smoldering Mid-Tempo \u2022 Southern Sass",
    "tag": "Album Track",
    "duration": "4:06",
    "src": "music/04-sunday-morning-apology.mp3",
    "artwork": "music/04-sunday-morning-apology.jpg",
    "lyrics": "[Intro]\n[Warm tremolo guitar chord, gentle finger snaps, and sigh]\nDing... 9:14 AM.\nRight on schedule, like clockwork.\n\n[Verse 1]\nYou drank twelve beers on a Saturday night\nPickin' bar fights under the neon light\nCallin' up my phone with a slurry drawl\nLeanin' on the jukebox against the wall\nNow the sun is high and your head hurts bad\nAnd you\u2019re suddenly missin' the best thing you had.\n\n[Pre-Chorus]\nGot a three-page text on my lockscreen glowing,\nSayin' you didn't mean it, your true colors showing.\nWell, honey, put your Bible in your front-row seat...\n\n[Chorus]\nSave that Sunday morning apology\nFor the preacher down in row number three!\nDon't confess your sins to my telephone screen,\nI ain't the salvation for where you\u2019ve been!\nYou broke my heart in a Friday haze,\nYou can't wash it clean in a twenty-minute praise!\nYeah, take your regret to the altar knee\u2014\nAnd save that Sunday morning apology!\n\n[Verse 2]\nI\u2019m on my front porch sippin' cold brew sweet\nGot my bare feet kickin' to a backroad beat\nI can hear the church bells ringin' in the pines\nWhile you\u2019re searchin' for forgiveness in between your lines\nYou want absolution without the work,\nBoy, grace is free, but you\u2019re still a jerk.\n\n[Pre-Chorus]\nGod might forgive a fool who lost his head,\nBut I\u2019m leavin' that message right on \"Read\"!\n\n[Chorus]\nSave that Sunday morning apology\nFor the preacher down in row number three!\nDon't confess your sins to my telephone screen,\nI ain't the salvation for where you\u2019ve been!\nYou broke my heart in a Friday haze,\nYou can't wash it clean in a twenty-minute praise!\nYeah, take your regret to the altar knee\u2014\nAnd save that Sunday morning apology!\n\n[Bridge]\n[Pedal Steel Weeps, Tremolo Guitar Softly Strums]\nHallelujah, amen, won't fall for this again.\nYou can pray all day to wash off your guilt,\nWon't rebuild the bridge that your whiskey spilt.\n\n[Pedal Steel Guitar Solo]\n\n[Chorus]\nSave that Sunday morning apology\nFor the preacher down in row number three!\nDon't confess your sins to my telephone screen,\nI ain't the salvation for where you\u2019ve been!\nYou broke my heart in a Friday haze,\nYou can't wash it clean in a twenty-minute praise!\nYeah, take your regret to the altar knee\u2014\nAnd save that Sunday morning apology!\n\n[Outro]\nAmen to that.\nPut an extra five in the collection plate, darling.\nYou're gonna need it.\n[Gentle guitar fade]"
  },
  {
    "id": "track-05-back-to-leipers-fork",
    "title": "Back to Leiper's Fork",
    "subtitle": "Hometown Pride \u2022 Emotional Centerpiece Ballad",
    "tag": "Ballad",
    "duration": "4:33",
    "src": "music/05-back-to-leipers-fork.mp3",
    "artwork": "music/05-back-to-leipers-fork.jpg",
    "lyrics": "[Intro]\n[Gentle fingerpicking on acoustic guitar, distant wind chimes, weeping pedal steel]\n\n[Verse 1]\nThere's an old wooden bridge where the water runs clear\nWhere I scraped my knees every summer for years\nMy granddaddy's initials carved deep in the pine\nRight next to an arrow that points back to mine\nBroadway's got spotlights and skyscrapers tall\nTryin' to turn every bird into someone they call\nA star in the making, a voice on the street...\nBut my soul only dances where moss meets my feet.\n\n[Pre-Chorus]\nThey can offer me diamonds and velvet and fame,\nBut not one of those contracts remembers my name...\n\n[Chorus]\nLike the hills of Leiper's Fork,\nWhere the creek washes over the stone,\nWhere the cedar trees whisper the words:\n\"Girl, you're never alone.\"\nWhen the neon gets heavy and Nashville gets loud,\nAnd I'm lost in the noise of a runaway crowd,\nI just follow the compass that beats in my chest,\nBack to Leiper's Fork... where my spirit finds rest.\n\n[Verse 2]\nThere\u2019s a front porch swing that still squeaks when you sway\nAnd a screen door that slams at the end of the day\nMama\u2019s gardenias bloom white in the shade\nReminding me roots are the things you don't trade\nA girl with a guitar can wander so far\nChase down a dream in the back of a car\nBut without the red dirt on the soles of my shoes\nI'm just singin' someone else's blues.\n\n[Pre-Chorus]\nSo when Music Row asks who I'm tryin' to be,\nI just tell 'em to drive thirty miles west of town and see...\n\n[Chorus]\nThe hills of Leiper's Fork,\nWhere the creek washes over the stone,\nWhere the cedar trees whisper the words:\n\"Girl, you're never alone.\"\nWhen the neon gets heavy and Nashville gets loud,\nAnd I'm lost in the noise of a runaway crowd,\nI just follow the compass that beats in my chest,\nBack to Leiper's Fork... where my spirit finds rest.\n\n[Bridge]\n[Sweeping Strings and Fiddle Swell, Organ Rises]\nNo gold record can hold me when the twilight turns blue.\nNo stadium roar tells me what to hold true.\nIt\u2019s the church bell at dusk and the firefly glow,\nThat taught this small town wren how to sing and to grow.\n\n[Fiddle Solo - Haunting and Gorgeous]\n\n[Chorus]\nIn the hills of Leiper's Fork,\nWhere the creek washes over the stone,\nWhere the cedar trees whisper the words:\n\"Wren, you're always at home.\"\nWhen the neon gets heavy and Nashville gets loud,\nAnd I'm lost in the noise of a runaway crowd,\nI just follow the compass that beats in my chest,\nBack to Leiper's Fork... where my spirit finds rest.\n\n[Outro]\nYeah, right where my spirit finds rest.\nJust take me back home.\n[Soft acoustic strum and fading cicadas]"
  },
  {
    "id": "track-06-shotgun-rider",
    "title": "Shotgun Rider",
    "subtitle": "Windows-Down Highway Pop \u2022 Summer Drive",
    "tag": "Radio Single",
    "duration": "3:47",
    "src": "music/06-shotgun-rider.mp3",
    "artwork": "music/06-shotgun-rider.jpg",
    "lyrics": "[Intro]\n[Mandolin riff, kick drum heartbeat, acoustic strums opening wide]\nRolling down Natchez Trace Parkway...\nWindows down, golden hour.\n\n[Verse 1]\nFor two straight summers I sat on the right\nWatchin' you steer through the Tennessee night\nPlayin' your music, pickin' your stops\nWorried about where your quick temper would drop\nYou thought I belonged in the passenger seat\nJust smilin' along to the radio beat.\n\n[Pre-Chorus]\nWell, I pulled over and told you to walk,\nNow there's nobody left but the wind and my talk!\n\n[Chorus]\nAin't nobody's shotgun rider no more!\nGot my own two hands and my foot to the floor!\nGot the two-tone Ford on a blacktop roll,\nNobody tells this heart where to go!\nFresh air in my hair and the sun on my face,\nLeavin' your rearview without a trace!\nAin't lookin' for someone to pilot my door\u2014\nI ain't nobody's shotgun rider no more!\n[Mandolin & Electric Guitar Hook]\n\n[Verse 2]\nNow my best girlfriend is ridin' upfront\nSingin' off-key doin' whatever we want\nAcoustic guitar in the cab by our side\nNo boy to critique how we take this ride\nLook at this sky turnin' peach-colored pink\nAin't it funny how fast a bad memory can shrink?\n\n[Pre-Chorus]\nI don't need a cowboy to tell me to drive,\nI just needed the keys to feel this alive!\n\n[Chorus]\nAin't nobody's shotgun rider no more!\nGot my own two hands and my foot to the floor!\nGot the two-tone Ford on a blacktop roll,\nNobody tells this heart where to go!\nFresh air in my hair and the sun on my face,\nLeavin' your rearview without a trace!\nAin't lookin' for someone to pilot my door\u2014\nI ain't nobody's shotgun rider no more!\n\n[Bridge]\n[Driving Bassline with Acoustic Chop and Handclaps]\nI spent too many miles watchin' somebody else's road.\nDropped off your baggage, threw down the load!\nNow I'm steerin' this life straight into the blue!\n(Watch me go!)\n\n[Guitar Solo - Melodic and Soaring]\n\n[Chorus]\nAin't nobody's shotgun rider no more!\nGot my own two hands and my foot to the floor!\nGot the two-tone Ford on a blacktop roll,\nNobody tells this heart where to go!\nFresh air in my hair and the sun on my face,\nLeavin' your rearview without a trace!\nAin't lookin' for someone to pilot my door\u2014\nI ain't nobody's shotgun rider no more!\n\n[Outro]\nI'm in the driver's seat, baby.\nAll mine.\n[Engine hum and laughing guitar fade]"
  },
  {
    "id": "track-07-sweet-tea-gasoline",
    "title": "Sweet Tea & Gasoline",
    "subtitle": "Title Track \u2022 Swampy Slide Stomp",
    "tag": "Title Track",
    "duration": "4:12",
    "src": "music/07-sweet-tea-and-gasoline.mp3",
    "artwork": "music/07-sweet-tea-and-gasoline.jpg",
    "lyrics": "[Intro]\n[Heavy boot stomps, dirty dobro slide lick, Wren laughing softly]\nThey see the gingham dress and they think \"bless her heart\"...\nThey never see the fire till it's tearing 'em apart.\n\n[Verse 1]\nPorch swing manners, mama taught me well\nHow to say good mornin' and let the gossip settle\nHow to pour a pitcher with a lemon slice\nHow to smile real sweet and play sugar-and-spice\nTill a silver-tongued devil tries to cross my line\nThinkin' I'm a target he can take his time to blind.\n\n[Pre-Chorus]\nUnderneath this lace and this ribbon in my hair,\nThere's a 400-horsepower motor waitin' there!\n\n[Chorus]\nI\u2019m sweet tea and gasoline!\nPrettiest wildfire you ever seen!\nOne part angel on a Sunday pew,\nOne part thunder comin' after you!\nStrike me wrong and you\u2019ll find out quick,\nI burn real hot and I don\u2019t take shit!\nA little bit of Southern, a whole lotta mean\u2014\nYeah, I\u2019m sweet tea and gasoline!\n[Dirty Harmonica & Slide Guitar Riff]\n\n[Verse 2]\nI can bake a buttermilk biscuit from scratch\nThen turn right around and light a cedar barn match\nI don't start the trouble, but I close the book\nPut a bully in his place with a thirty-second look\nYou can bring your big talk and your five-star pride\nYou're just a little spark on my wild hillside.\n\n[Pre-Chorus]\nSo keep your hands off the bottle and your mouth in check,\nBefore I drop a lightning bolt right down your neck!\n\n[Chorus]\nI\u2019m sweet tea and gasoline!\nPrettiest wildfire you ever seen!\nOne part angel on a Sunday pew,\nOne part thunder comin' after you!\nStrike me wrong and you\u2019ll find out quick,\nI burn real hot and I don\u2019t take shit!\nA little bit of Southern, a whole lotta mean\u2014\nYeah, I\u2019m sweet tea and gasoline!\n\n[Bridge]\n[Stomp-Stomp-Clap rhythm only with Gritty Harmonica wail]\nSugar in the glass...\nSulfur in the tank...\nYou can check my reputation, boy,\nAsk the Leiper's bank!\nI don't owe nobody nothing!\n(Burn it down!)\n\n[Explosive Dual Guitar & Harmonica Solo]\n\n[Chorus]\nI\u2019m sweet tea and gasoline!\nPrettiest wildfire you ever seen!\nOne part angel on a Sunday pew,\nOne part thunder comin' after you!\nStrike me wrong and you\u2019ll find out quick,\nI burn real hot and I don\u2019t take shit!\nA little bit of Southern, a whole lotta mean\u2014\nYeah, I\u2019m sweet tea and gasoline!\n\n[Outro]\nSweet as honey... hot as smoke.\nDon't get burned, darling.\n[Harmonica trill and boot stomp finale]"
  },
  {
    "id": "track-08-wildflower-sleeve",
    "title": "Wildflower Sleeve",
    "subtitle": "Poetic Storytelling \u2022 Botanical Inks",
    "tag": "Deep Cut",
    "duration": "3:54",
    "src": "music/08-wildflower-sleeve.mp3",
    "artwork": "music/08-wildflower-sleeve.jpg",
    "lyrics": "[Intro]\n[Delicate fingerstyle acoustic guitar with ambient cello swells]\n\n[Verse 1]\nPeople ask me about the ink along my right arm\nIf it's just some pretty picture to add a little charm\nThey see the honeysuckle climbin' up my wrist\nThe morning glories tangle in a gentle little twist\nBlack and grey needlework, delicate and fine...\nThey don't know each petal marks a heartbreak of mine.\n\n[Pre-Chorus]\nThe dogwood at my collarbone was for the boy who left,\nThe chicory blossom was for learnin' to forgive myself.\n\n[Chorus]\nEvery thorn, every vine, every tangled leaf,\nTells the story of the beauty growin' out of grief.\nYou can break a girl's spirit, you can tear her down,\nShe\u2019ll just bury those roots deeper in the ground.\nI wear my battles right where everyone can see\u2014\nTurned all my bruises into a wildflower sleeve.\n[Cello & Pedal Steel Swell]\n\n[Verse 2]\nGot the black-eyed Susan bloom down beside my knee\nFrom the summer I learned how to stand up on my feet\nWhen you take the hits in a little southern town\nFolks expect you to keep your eyes pointed down\nHide the tears in a pillow, swallow your pride\nI decided to let my scars walk outside.\n\n[Pre-Chorus]\nNow when the sun hits my skin at golden hour glow,\nI see all the gardens that the hard times had to grow.\n\n[Chorus]\nEvery thorn, every vine, every tangled leaf,\nTells the story of the beauty growin' out of grief.\nYou can break a girl's spirit, you can tear her down,\nShe\u2019ll just bury those roots deeper in the ground.\nI wear my battles right where everyone can see\u2014\nTurned all my bruises into a wildflower sleeve.\n\n[Bridge]\n[Acoustic Guitar, Lush Harmony Vocals]\nWildflowers don't ask for permission to bloom.\nThey split through the concrete and take over the room.\nNo water in the ditch, no sunlight to spare,\nThey just blossom anyway... right into thin air.\n\n[Pedal Steel & Acoustic Interlude]\n\n[Chorus]\nEvery thorn, every vine, every tangled leaf,\nTells the story of the beauty growin' out of grief.\nYou can break a girl's spirit, you can tear her down,\nShe\u2019ll just bury those roots deeper in the ground.\nI wear my battles right where everyone can see\u2014\nTurned all my bruises into a wildflower sleeve.\n\n[Outro]\nTurned all my bruises...\nInto wildflowers.\nBloomin' on my sleeve.\n[Soft acoustic fadeout with lingering cello note]"
  },
  {
    "id": "track-09-two-lane-therapy",
    "title": "Two-Lane Therapy",
    "subtitle": "Sunny 12-String Chime \u2022 Backroad Bop",
    "tag": "Radio Bop",
    "duration": "3:34",
    "src": "music/09-two-lane-therapy.mp3",
    "artwork": "music/09-two-lane-therapy.jpg",
    "lyrics": "[Intro]\n[12-string acoustic strum, happy fiddle lick, Wren whistling]\nThirty-five dollars for a tank of unleaded...\nCheapest cure in the state of Tennessee.\n\n[Verse 1]\nHad a boss on my back from nine until five\nPhone blowin' up like a hornet's hive\nBills on the counter and drama in town\nEverybody tellin' me how to not drown\nI didn't call a counselor, didn't drink wine,\nI just grabbed my keys and hit the county line.\n\n[Pre-Chorus]\nNo appointments, no waitin' in the hall,\nJust two yellow stripes takin' care of it all.\n\n[Chorus]\nGive me that two-lane therapy!\nRoll the window down and set my spirit free!\nThirty-five miles an hour on a winding curve,\nCalmin' every single over-caffeinated nerve!\nRadio dialed to ninety-seven three,\nAcoustic guitar singin' right back to me!\nAin't nothin' broken that the blacktop can't heal\u2014\nGimme two-lane therapy behind this wheel!\n[Bright Fiddle & 12-String Hook]\n\n[Verse 2]\nPassed Old Man Miller out mowin' the hay\nWaved with two fingers in the regular way\nCows by the fencepost chewin' the grass\nWatchin' the worry and the headaches pass\nLook at that sun droppin' low through the pines\nWashin' away every worry in my mind.\n\n[Pre-Chorus]\nSome people pay two hundred bucks for an hour on a couch,\nI get the cure with the clutch and the clutch.\n\n[Chorus]\nGive me that two-lane therapy!\nRoll the window down and set my spirit free!\nThirty-five miles an hour on a winding curve,\nCalmin' every single over-caffeinated nerve!\nRadio dialed to ninety-seven three,\nAcoustic guitar singin' right back to me!\nAin't nothin' broken that the blacktop can't heal\u2014\nGimme two-lane therapy behind this wheel!\n\n[Bridge]\n[Groovy Bass and Drum Pocket with Fiddle Call-and-Response]\nPast the general store...\nPast the old mill creek...\nBreathin' in the cedar...\nExhalin' the week.\n(Take it home, boys!)\n\n[Guitar and Fiddle Harmonized Solo]\n\n[Chorus]\nGive me that two-lane therapy!\nRoll the window down and set my spirit free!\nThirty-five miles an hour on a winding curve,\nCalmin' every single over-caffeinated nerve!\nRadio dialed to ninety-seven three,\nAcoustic guitar singin' right back to me!\nAin't nothin' broken that the blacktop can't heal\u2014\nGimme two-lane therapy behind this wheel!\n\n[Outro]\nJust keep on rollin'.\nTwo-lane therapy.\nNothin' like it.\n[Whistling and gentle engine fadeout]"
  },
  {
    "id": "track-10-wrong-kind-of-cowboy",
    "title": "Wrong Kind of Cowboy",
    "subtitle": "Slow-Burn Honky-Tonk Pop \u2022 Crying Steel",
    "tag": "Honky-Tonk",
    "duration": "4:23",
    "src": "music/10-wrong-kind-of-cowboy.mp3",
    "artwork": "music/10-wrong-kind-of-cowboy.jpg",
    "lyrics": "[Intro]\n[Smoky brushed snare, weeping pedal steel lick, lone acoustic guitar strum]\n\n[Verse 1]\nYou bought your boots in a mall out in Dallas\nSilver tip toes without a single hard callus\nNever milked a cow, never mended a wire\nNever spent a night beside a cedarwood fire\nYou got the silver belt buckle from a pawn shop shelf\nMakin' up stories to convince yourself.\n\n[Pre-Chorus]\nA real cowboy respects the saddle and the herd,\nA real cowboy's got his honor in his word.\nYou're just playin' dress up under neon lights...\n\n[Chorus]\nYou\u2019re the wrong kind of cowboy!\nAll high-dollar starch and counterfeit pride!\nYou talk about the range like you\u2019ve been on the ride!\nYou wear the hat like you rode in on the trail,\nWhen your biggest rough ride was an internet sale!\nYou\u2019re great at rope tricks till the heart breaks loose,\nThen you run like a dog with an easy excuse.\nA real man stands when the dust settles down\u2014\nYou\u2019re just the wrong kind of cowboy in a plastic town.\n[Crying Pedal Steel Solo]\n\n[Verse 2]\nMy granddaddy\u2019s hands had the earth in the crease\nHe worked till the sunset and prayed for some peace\nHe loved my sweet gran for forty-five years\nHe never left a woman to choke on her tears\nSo when you tip your brim like you\u2019re John Wayne reborn\nI see right through that starched cotton thorn.\n\n[Pre-Chorus]\nYou think the costume buys you a pass to deceive,\nHoney, you're the easiest trick to leave.\n\n[Chorus]\nYou\u2019re the wrong kind of cowboy!\nAll high-dollar starch and counterfeit pride!\nYou talk about the range like you\u2019ve been on the ride!\nYou wear the hat like you rode in on the trail,\nWhen your biggest rough ride was an internet sale!\nYou\u2019re great at rope tricks till the heart breaks loose,\nThen you run like a dog with an easy excuse.\nA real man stands when the dust settles down\u2014\nYou\u2019re just the wrong kind of cowboy in a plastic town.\n\n[Bridge]\n[Sparse Brushed Snare and Walking Bass Only]\nTake off the spurs, boy, you haven't earned the sound.\nTake off the Stetson, put it on the ground.\nYou're not a wild horse you're just untamed ego...\nAnd it's time for you to go.\n\n[Biting Telecaster Guitar Solo]\n\n[Chorus]\nYou\u2019re the wrong kind of cowboy!\nAll high-dollar starch and counterfeit pride!\nYou talk about the range like you\u2019ve been on the ride!\nYou wear the hat like you rode in on the trail,\nWhen your biggest rough ride was an internet sale!\nYou\u2019re great at rope tricks till the heart breaks loose,\nThen you run like a dog with an easy excuse.\nA real man stands when the dust settles down\u2014\nYou\u2019re just the wrong kind of cowboy in a plastic town.\n\n[Outro]\nGo find a mirror, rhinestone.\nWrong kind of cowboy.\n[Pedal steel final mournful bend]"
  },
  {
    "id": "track-11-dust-on-the-dash",
    "title": "Dust on the Dash",
    "subtitle": "Twilight Nostalgia \u2022 1978 Ford Ballad",
    "tag": "Acoustic Ballad",
    "duration": "4:14",
    "src": "music/11-dust-on-the-dash.mp3",
    "artwork": "music/11-dust-on-the-dash.jpg",
    "lyrics": "[Intro]\n[Distant cricket hum, soft acoustic fingerpicking, ambient pedal steel swell]\n\n[Verse 1]\nIt\u2019s been eighty-four days since you rode in this truck\nNineteen seventy-eight Ford runnin' on luck\nVinyl bench seat where you used to sit close\nWhere I memorized what I would miss the most\nRight above the glove box where the cedar road blows\nThere\u2019s a layer of dust that nobody knows.\n\n[Pre-Chorus]\nTwo months ago you drew a heart with your hand,\nRight in the red Tennessee sand.\nIt\u2019s been sitting right there through every mile I drove...\n\n[Chorus]\nThere was dust on the dash and your ghost in the seat,\nKeepin' me company on this gravel street.\nI didn't wipe it off 'cause it felt like goodbye,\nA little piece of you that was caught in my eye.\nTonight I put the truck in reverse by the creek,\nTook the sleeve of my flannel and wiped it clean and meek.\nIt\u2019s time to let the summer turn into the past\u2014\nCleared out your memory...\nAnd the dust on the dash.\n[Haunting Fiddle Swell]\n\n[Verse 2]\nFunny how a fingertip can leave such a mark\nTurn an old plastic dashboard into a spark\nI drove around for weeks scared to roll the windows down\nScared the Leiper's Fork wind would blow it out of town\nHoldin' onto dust 'cause I couldn't hold your hand\nGod, it\u2019s crazy what a broken heart can demand.\n\n[Pre-Chorus]\nTonight the moon came up over the cedar tree line,\nAnd I knew it was time to reclaim what was mine.\n\n[Chorus]\nThere was dust on the dash and your ghost in the seat,\nKeepin' me company on this gravel street.\nI didn't wipe it off 'cause it felt like goodbye,\nA little piece of you that was caught in my eye.\nTonight I put the truck in reverse by the creek,\nTook the sleeve of my flannel and wiped it clean and meek.\nIt\u2019s time to let the summer turn into the past\u2014\nCleared out your memory...\nAnd the dust on the dash.\n\n[Bridge]\n[Acoustic Strum and Gentle Cello Arpeggio]\nIt\u2019s just an old blue Ford.\nIt\u2019s just an empty space.\nIt\u2019s just the sunlight shinin' on a brand new face.\nThe air smells like rain coming down from the ridge...\nAnd I\u2019m finally crossin' that bridge.\n\n[Emotional Fiddle & Acoustic Climax]\n\n[Chorus]\nThere was dust on the dash and your ghost in the seat,\nKeepin' me company on this gravel street.\nI didn't wipe it off 'cause it felt like goodbye,\nA little piece of you that was caught in my eye.\nTonight I put the truck in reverse by the creek,\nTook the sleeve of my flannel and wiped it clean and meek.\nIt\u2019s time to let the summer turn into the past\u2014\nCleared out your memory...\nAnd the dust on the dash.\n\n[Outro]\nClean slate now.\nJust me and the open road.\n[Gentle engine ignition, soft acoustic strum fading away]"
  },
  {
    "id": "track-12-watch-me-fly",
    "title": "Watch Me Fly (Last Call for Leaving)",
    "subtitle": "Epic Stadium Finale \u2022 Roaring Twin Fiddles",
    "tag": "Album Closer",
    "duration": "4:28",
    "src": "music/12-watch-me-fly.mp3",
    "artwork": "music/12-watch-me-fly.jpg",
    "lyrics": "[Intro]\n[Roaring twin fiddles, huge stomp-clap stadium rhythm, screaming festival crowd energy]\n(Woo! Here we go!)\nThey say a wren was born with wings...\nWell, watch her fly!\n\n[Verse 1]\nBartender\u2019s flickin' the neon off at two\nChair legs up on the tables painted blue\nEverybody\u2019s talkin' 'bout what they should\u2019ve done\nWaitin' on a ticket that will never come\nI paid my tab, threw a twenty on the bar\nGot my battered six-string waitin' in the car.\n\n[Pre-Chorus]\nI love this little valley with all of my soul,\nBut there\u2019s a whole wide world callin' me to roll!\n\n[Chorus]\nThis is last call for leaving! Last chance to fly!\nUnderneath a big old Tennessee sky!\nI ain't runnin' scared, I\u2019m runnin' toward the light!\nLeavin' all the doubt behind me in the night!\nGot the wind at my back and fire in my chest,\nA little country wren flyin' out of the nest!\nHear the engine roar, hear the fiddles cry\u2014\nLast call for leaving, baby, watch me fly!\n[Blazing Twin Fiddle Hook & Stomp]\n\n[Verse 2]\nNashville\u2019s waitin' thirty miles down the track\nAnd after that, there ain't no lookin' back\nNew York to LA, stadiums and bars\nGonna paint my name across the country stars\nTook my mama\u2019s prayers and my granddaddy\u2019s grit\nGot a heart full of songs that won't ever quit!\n\n[Pre-Chorus]\nIf you\u2019re comin' with me, you better jump in now,\n'Cause this runaway train don't know how to slow down!\n\n[Chorus]\nThis is last call for leaving! Last chance to fly!\nUnderneath a big old Tennessee sky!\nI ain't runnin' scared, I\u2019m runnin' toward the light!\nLeavin' all the doubt behind me in the night!\nGot the wind at my back and fire in my chest,\nA little country wren flyin' out of the nest!\nHear the engine roar, hear the fiddles cry\u2014\nLast call for leaving, baby, watch me fly!\n\n[Bridge]\n[Explosive Drum Roll, Soaring High Vocal Hold]\n(Watch me fly!)\nSpread these wings wide!\nAin't nothin' holdin' this small town bird down!\n(Let's go!)\n\n[Twin Fiddle & Dual Electric Guitar Battle - Epic Climax]\n\n[Chorus]\nThis is last call for leaving! Last chance to fly!\nUnderneath a big old Tennessee sky!\nI ain't runnin' scared, I\u2019m runnin' toward the light!\nLeavin' all the doubt behind me in the night!\nGot the wind at my back and fire in my chest,\nA little country wren flyin' out of the nest!\nHear the engine roar, hear the fiddles cry\u2014\nLast call for leaving, baby, watch me fly!\n\n[Outro]\n[Huge vocal run on high notes]\nWatch me fly!\nYeah, this wren is in the sky!\nLast call for leaving!\n[Final triumphant fiddle chord and cheering roar fade]"
  }
];

  let currentTrackIndex = 0;
  let isPlaying = false;
  let isLooping = false;
  let isWarmthOn = true;

  // Web Audio Nodes
  let audioCtx = null;
  let sourceNode = null;
  let splitterNode = null;
  let analyserLeft = null;
  let analyserRight = null;
  let warmthFilter = null;
  let dataArrayLeft = null;
  let dataArrayRight = null;
  let leftNeedle = -0.75;
  let rightNeedle = -0.75;
  let animationStarted = false;

  // DOM Elements
  const audio = document.getElementById('mainAudio');
  const playPauseMasterBtn = document.getElementById('playPauseMasterBtn');
  const heroStreamNowBtn = document.getElementById('heroStreamNowBtn');
  const navStreamBtn = document.getElementById('navStreamBtn');
  const prevTrackBtn = document.getElementById('prevTrackBtn');
  const nextTrackBtn = document.getElementById('nextTrackBtn');
  const loopTrackBtn = document.getElementById('loopTrackBtn');
  const openLyricsBtn = document.getElementById('openLyricsBtn');
  const closeLyricsDrawerBtn = document.getElementById('closeLyricsDrawerBtn');
  const lyricsDrawer = document.getElementById('lyricsDrawer');
  const notebookSongTitle = document.getElementById('notebookSongTitle');
  const notebookLyricsBody = document.getElementById('notebookLyricsBody');
  const volumeSlider = document.getElementById('volumeSlider');
  const scrubberTrack = document.getElementById('scrubberTrack');
  const scrubberFill = document.getElementById('scrubberFill');
  const currentTimeEl = document.getElementById('currentTime');
  const totalDurationEl = document.getElementById('totalDuration');

  // Vinyl & Turntable Elements
  const vinylPlatter = document.getElementById('vinylPlatter');
  const vinylTrackTitle = document.getElementById('vinylTrackTitle');
  const tonearmAssembly = document.getElementById('tonearmAssembly');
  const turntableStateLabel = document.getElementById('turntableStateLabel');
  const playerArtImg = document.getElementById('playerArtImg');

  // Tuner & Meta Elements
  const tunerTrackIndex = document.getElementById('tunerTrackIndex');
  const playerTrackTag = document.getElementById('playerTrackTag');
  const playerTrackTitle = document.getElementById('playerTrackTitle');
  const playerTrackArtist = document.getElementById('playerTrackArtist');
  const playlistContainer = document.getElementById('playlistContainer');

  // Mini Player Elements
  const persistentMiniPlayer = document.getElementById('persistentMiniPlayer');
  const heroMiniThumb = document.getElementById('heroMiniThumb');
  const heroMiniTitle = document.getElementById('heroMiniTitle');
  const heroMiniSubtitle = document.getElementById('heroMiniSubtitle');
  const heroMiniPlayBtn = document.getElementById('heroMiniPlayBtn');

  // VU Meter Canvases
  const vuMeterLeft = document.getElementById('vuMeterLeft');
  const vuMeterRight = document.getElementById('vuMeterRight');
  const vuCtxLeft = vuMeterLeft ? vuMeterLeft.getContext('2d') : null;
  const vuCtxRight = vuMeterRight ? vuMeterRight.getContext('2d') : null;

  function initAudioContext() {
    if (audioCtx) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();

      // Media Element Source
      sourceNode = audioCtx.createMediaElementSource(audio);

      // Stereo Splitter for Dual VU Meters
      splitterNode = audioCtx.createChannelSplitter(2);
      analyserLeft = audioCtx.createAnalyser();
      analyserRight = audioCtx.createAnalyser();
      analyserLeft.fftSize = 256;
      analyserRight.fftSize = 256;
      analyserLeft.smoothingTimeConstant = 0.75;
      analyserRight.smoothingTimeConstant = 0.75;

      dataArrayLeft = new Uint8Array(analyserLeft.frequencyBinCount);
      dataArrayRight = new Uint8Array(analyserRight.frequencyBinCount);

      // 12AX7 Tube Preamp Warmth Filter (Low-shelf boost + gentle body)
      warmthFilter = audioCtx.createBiquadFilter();
      warmthFilter.type = 'lowshelf';
      warmthFilter.frequency.value = 260;
      warmthFilter.gain.value = isWarmthOn ? 3.5 : 0;

      // Audio Graph Connections
      sourceNode.connect(splitterNode);
      splitterNode.connect(analyserLeft, 0);
      splitterNode.connect(analyserRight, 1);

      sourceNode.connect(warmthFilter);
      warmthFilter.connect(audioCtx.destination);

      if (!animationStarted) {
        animationStarted = true;
        animateVUMeters();
      }
    } catch (e) {
      console.warn('Web Audio API unavailable or autoplay policy restricted:', e);
    }
  }

  function getMeterLevel(analyser, dataArray) {
    if (!analyser || !dataArray) return 0;
    analyser.getByteTimeDomainData(dataArray);
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      const norm = (dataArray[i] - 128) / 128;
      sum += norm * norm;
    }
    const rms = Math.sqrt(sum / dataArray.length);
    return Math.min(1, rms * 3.4);
  }

  function drawVUNeedle(ctx, width, height, currentAngle) {
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height + 4;
    const r = 48;

    ctx.save();

    // Calibration Arc
    ctx.beginPath();
    ctx.arc(cx, cy, r + 2, -Math.PI * 0.72, -Math.PI * 0.28);
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Red Danger Zone Arc (+0 to +3 dB)
    ctx.beginPath();
    ctx.arc(cx, cy, r + 2, -Math.PI * 0.40, -Math.PI * 0.28);
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.55)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Needle Tip Position
    const tipX = cx + Math.sin(currentAngle) * r;
    const tipY = cy - Math.cos(currentAngle) * r;

    // Drop Shadow for Needle Depth
    ctx.beginPath();
    ctx.moveTo(cx + 1, cy + 1);
    ctx.lineTo(tipX + 2, tipY + 2);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Needle Line
    const isOverload = currentAngle > 0.42;
    const grad = ctx.createLinearGradient(cx, cy, tipX, tipY);
    grad.addColorStop(0, '#f59e0b');
    grad.addColorStop(0.7, '#fbbf24');
    grad.addColorStop(1, isOverload ? '#ef4444' : '#f59e0b');

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(tipX, tipY);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.8;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Pivot Base Cap
    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#1e293b';
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Center Screw Dot
    ctx.beginPath();
    ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = '#fbbf24';
    ctx.fill();

    ctx.restore();
  }

  function animateVUMeters() {
    requestAnimationFrame(animateVUMeters);

    let targetLeft = -0.75;
    let targetRight = -0.75;

    if (isPlaying && analyserLeft && analyserRight && dataArrayLeft && dataArrayRight) {
      const rawLeft = getMeterLevel(analyserLeft, dataArrayLeft);
      const rawRight = getMeterLevel(analyserRight, dataArrayRight);

      targetLeft = -0.75 + rawLeft * 1.48;
      targetRight = -0.75 + rawRight * 1.48;

      // Subtle natural analog flutter
      targetLeft += (Math.random() - 0.5) * 0.035;
      targetRight += (Math.random() - 0.5) * 0.035;
    }

    // Realistic Analog Ballistics: Fast Rise (Attack), Smooth Decay (Dampened Release)
    const attackSpeed = 0.45;
    const decaySpeed = 0.085;

    if (targetLeft > leftNeedle) {
      leftNeedle += (targetLeft - leftNeedle) * attackSpeed;
    } else {
      leftNeedle += (targetLeft - leftNeedle) * decaySpeed;
    }

    if (targetRight > rightNeedle) {
      rightNeedle += (targetRight - rightNeedle) * attackSpeed;
    } else {
      rightNeedle += (targetRight - rightNeedle) * decaySpeed;
    }

    leftNeedle = Math.max(-0.75, Math.min(0.75, leftNeedle));
    rightNeedle = Math.max(-0.75, Math.min(0.75, rightNeedle));

    if (vuCtxLeft && vuMeterLeft) {
      drawVUNeedle(vuCtxLeft, vuMeterLeft.width, vuMeterLeft.height, leftNeedle);
    }
    if (vuCtxRight && vuMeterRight) {
      drawVUNeedle(vuCtxRight, vuMeterRight.width, vuMeterRight.height, rightNeedle);
    }
  }

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function loadTrack(index) {
    if (index < 0 || index >= tracks.length) return;
    currentTrackIndex = index;
    const track = tracks[currentTrackIndex];

    audio.src = track.src;
    audio.load();

    // Turntable & Disc Updates
    if (vinylTrackTitle) vinylTrackTitle.textContent = track.title;
    if (tunerTrackIndex) tunerTrackIndex.textContent = `TRACK ${String(index + 1).padStart(2, '0')} OF 12`;
    if (playerTrackTag) playerTrackTag.textContent = track.tag || 'Studio Master';
    if (playerTrackTitle) playerTrackTitle.textContent = track.title;
    if (playerTrackArtist) playerTrackArtist.textContent = `Wren Montgomery • ${track.subtitle}`;
    if (totalDurationEl) totalDurationEl.textContent = track.duration;

    // Songwriter Journal / Lyrics
    if (notebookSongTitle) notebookSongTitle.textContent = `Songwriter's Journal — ${track.title}`;
    if (notebookLyricsBody) notebookLyricsBody.textContent = track.lyrics || 'Lyrics currently in archival review.';

    // Mini Player Elements
    if (heroMiniThumb) heroMiniThumb.src = track.artwork;
    if (heroMiniTitle) heroMiniTitle.textContent = track.title;
    if (heroMiniSubtitle) heroMiniSubtitle.textContent = track.subtitle;

    updatePlaylistActiveState();
  }

  function playTrack() {
    initAudioContext();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    audio.play().then(() => {
      isPlaying = true;
      updatePlayStateUI(true);
    }).catch(err => {
      console.warn('Playback deferred pending user interaction:', err);
    });
  }

  function pauseTrack() {
    audio.pause();
    isPlaying = false;
    updatePlayStateUI(false);
  }

  function togglePlayPause() {
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack();
    }
  }

  function updatePlayStateUI(playing) {
    const playIconSvg = '<svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
    const pauseIconSvg = '<svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
    const miniPlaySvg = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
    const miniPauseSvg = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';

    if (playPauseMasterBtn) playPauseMasterBtn.innerHTML = playing ? pauseIconSvg : playIconSvg;
    if (heroMiniPlayBtn) heroMiniPlayBtn.innerHTML = playing ? miniPauseSvg : miniPlaySvg;

    // Physical Turntable Motion
    if (vinylPlatter) {
      if (playing) vinylPlatter.classList.add('spinning');
      else vinylPlatter.classList.remove('spinning');
    }
    if (tonearmAssembly) {
      if (playing) tonearmAssembly.classList.add('dropped');
      else tonearmAssembly.classList.remove('dropped');
    }
    if (turntableStateLabel) {
      turntableStateLabel.textContent = playing ? 'PLAYING 33⅓ RPM' : 'NEEDLE REST';
      turntableStateLabel.style.color = playing ? '#10b981' : '#fbbf24';
    }

    // Toggle active animations on track cards
    updatePlaylistActiveState();
  }

  function renderPlaylist() {
    if (!playlistContainer) return;
    playlistContainer.innerHTML = '';

    tracks.forEach((track, idx) => {
      const card = document.createElement('div');
      card.className = `track-card ${idx === currentTrackIndex ? 'active' : ''}`;
      card.dataset.index = idx;

      card.innerHTML = `
        <div class="track-card-left">
          <div class="track-num-badge">${String(idx + 1).padStart(2, '0')}</div>
          <div class="track-card-info">
            <div class="track-card-title">${track.title}</div>
            <span class="track-card-pill">${track.tag || track.subtitle}</span>
          </div>
        </div>
        <div class="track-card-right">
          <span class="track-card-dur">${track.duration}</span>
          <div class="track-eq-anim">
            <div class="eq-bar"></div>
            <div class="eq-bar"></div>
            <div class="eq-bar"></div>
            <div class="eq-bar"></div>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        loadTrack(idx);
        playTrack();
      });

      playlistContainer.appendChild(card);
    });
  }

  function updatePlaylistActiveState() {
    if (!playlistContainer) return;
    const cards = playlistContainer.querySelectorAll('.track-card');
    cards.forEach((card, idx) => {
      if (idx === currentTrackIndex) {
        card.classList.add('active');
        const eqBars = card.querySelectorAll('.eq-bar');
        eqBars.forEach(bar => {
          bar.style.animationPlayState = isPlaying ? 'running' : 'paused';
        });
      } else {
        card.classList.remove('active');
      }
    });
  }

  // Audio Event Listeners
  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      const progress = (audio.currentTime / audio.duration) * 100;
      if (scrubberFill) scrubberFill.style.width = `${progress}%`;
      if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    if (totalDurationEl && audio.duration) {
      totalDurationEl.textContent = formatTime(audio.duration);
    }
  });

  audio.addEventListener('ended', () => {
    if (isLooping) {
      audio.currentTime = 0;
      playTrack();
    } else {
      nextTrack();
    }
  });

  function prevTrack() {
    let newIndex = currentTrackIndex - 1;
    if (newIndex < 0) newIndex = tracks.length - 1;
    loadTrack(newIndex);
    playTrack();
  }

  function nextTrack() {
    let newIndex = currentTrackIndex + 1;
    if (newIndex >= tracks.length) newIndex = 0;
    loadTrack(newIndex);
    playTrack();
  }

  // Scrubber Seek
  if (scrubberTrack) {
    scrubberTrack.addEventListener('click', (e) => {
      const rect = scrubberTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      if (audio.duration) {
        audio.currentTime = ratio * audio.duration;
      }
    });
  }

  // Volume
  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      audio.volume = parseFloat(e.target.value);
    });
  }

  // Controls Event Listeners
  if (playPauseMasterBtn) playPauseMasterBtn.addEventListener('click', togglePlayPause);
  if (heroMiniPlayBtn) heroMiniPlayBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePlayPause();
  });
  if (prevTrackBtn) prevTrackBtn.addEventListener('click', prevTrack);
  if (nextTrackBtn) nextTrackBtn.addEventListener('click', nextTrack);

  if (loopTrackBtn) {
    loopTrackBtn.addEventListener('click', () => {
      isLooping = !isLooping;
      loopTrackBtn.classList.toggle('active', isLooping);
    });
  }



  // Songwriter's Journal / Lyric Sheet Drawer
  function toggleLyricDrawer() {
    if (!lyricsDrawer) return;
    const isOpen = lyricsDrawer.classList.toggle('active');
    if (openLyricsBtn) openLyricsBtn.classList.toggle('active', isOpen);
    if (isOpen) {
      lyricsDrawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  if (openLyricsBtn) {
    openLyricsBtn.addEventListener('click', toggleLyricDrawer);
  }

  if (closeLyricsDrawerBtn) {
    closeLyricsDrawerBtn.addEventListener('click', () => {
      if (lyricsDrawer) lyricsDrawer.classList.remove('active');
      if (openLyricsBtn) openLyricsBtn.classList.remove('active');
    });
  }

  if (heroStreamNowBtn) {
    heroStreamNowBtn.addEventListener('click', () => {
      const musicSec = document.getElementById('music');
      if (musicSec) musicSec.scrollIntoView({ behavior: 'smooth' });
      playTrack();
    });
  }

  if (navStreamBtn) {
    navStreamBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const musicSec = document.getElementById('music');
      if (musicSec) musicSec.scrollIntoView({ behavior: 'smooth' });
      playTrack();
    });
  }

  // Floating Mini Player Click -> Scroll to Turntable Deck
  if (persistentMiniPlayer) {
    persistentMiniPlayer.addEventListener('click', (e) => {
      if (e.target.closest('#heroMiniPlayBtn')) return;
      const musicSec = document.getElementById('music');
      if (musicSec) musicSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Initial draw of idle VU meters
  if (vuCtxLeft && vuMeterLeft) {
    drawVUNeedle(vuCtxLeft, vuMeterLeft.width, vuMeterLeft.height, -0.75);
  }
  if (vuCtxRight && vuMeterRight) {
    drawVUNeedle(vuCtxRight, vuMeterRight.width, vuMeterRight.height, -0.75);
  }

  // Init
  loadTrack(0);
  renderPlaylist();

  // Expose global controller
  window.wrenPlayer = {
    tracks,
    loadTrack,
    playTrack,
    pauseTrack,
    togglePlayPause
  };
})();
