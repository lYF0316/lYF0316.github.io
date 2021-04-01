
/*-----------------------=========TYPEWRITER=========--------------------------*/
(function($) {
    $.fn.typewriter = function(e) {
        $(this).css("visibility","visible");
        this.each(function() {
            let $ele = $(this), str = $ele.html(), progress = 0;
            $ele.html('');
            let timer = setInterval(function() {
                let current = str.substr(progress, 1);
                if (current === '<') {
                    progress = str.indexOf('>', progress) + 1;
                } else {
                    progress++;
                }
                $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
                if (progress >= str.length) {
                    clearInterval(timer);
                    e.fadeIn(3000);
                }
            }, 75);
        });
        return this;
    };
})(jQuery);
/*-----------------------=========TIMEELAPSE=========--------------------------*/
function timeElapse(date)   {
    let current = new Date();
    let seconds = parseInt(current - date) / 1000;
    let days = Math.floor(seconds / (3600 * 24));
    seconds = seconds % (3600 * 24);
    let hours = Math.floor(seconds / 3600);
    if (hours < 10) {
        hours = "0" + hours;
    }
    seconds = seconds % 3600;
    let minutes = Math.floor(seconds / 60);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    seconds = Math.floor(seconds % 60);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    let result = "<span class=\"digit\">" + days + "</span> 天 <span class=\"digit\">" + hours + "</span> 时 <span class=\"digit\">" + minutes + "</span> 分 <span class=\"digit\">" + seconds + "</span> 秒";
    $("#elapseClock").html(result);
}
/*-----------------------========FULL LOVE SCREEN========------------------------*/

function loveFullScreen() {
    let canvas = document.getElementById("fullLove");
    let wrapper = document.getElementById("loveContentPage1");
    let ctx = canvas.getContext("2d");
    let c = $("#fullLove");
    let w,h;
    let pi = Math.PI;
    let all_attribute = {
        num:100,            			 // 个数
        start_probability:0.1,		     // 如果数量小于num，有这些几率添加一个新的
        size_min:1,   			         // 初始爱心大小的最小值
        size_max:2,   			         // 初始爱心大小的最大值
        size_add_min:0.3,                // 每次变大的最小值（就是速度）
        size_add_max:0.5,                // 每次变大的最大值
        opacity_min:0.3,                 // 初始透明度最小值
        opacity_max:0.5, 				 // 初始透明度最大值
        opacity_prev_min:.003,           // 透明度递减值最小值
        opacity_prev_max:.005,           // 透明度递减值最大值
        light_min:0,                 	 // 颜色亮度最小值
        light_max:90,                 	 // 颜色亮度最大值
    };
    let style_color = find_random(0,360);
    let all_element =[];
    window_resize();
    function start(){
        window.requestAnimationFrame(start);
        style_color+=0.1;
        //更改背景色hsl(颜色值，饱和度，明度)
        ctx.fillStyle = 'hsl('+style_color+',100%,97%)';
        ctx.fillRect(0, 0, w, h);
        if (all_element.length < all_attribute.num && Math.random() < all_attribute.start_probability){
            all_element.push(new ready_run);
        }
        all_element.map(function(line) {
            line.to_step();
        })
    }
    function ready_run(){
        this.to_reset();
    }
    function arc_heart(x,y,z,m){
        //绘制爱心图案的方法，参数x,y是爱心的初始坐标，z是爱心的大小，m是爱心上升的速度
        //爱心向左飘
        //  x+=m;
        //爱心向右飘
        //  x-=m;
        //爱心向上飘，向下飘换成+
        y-=m*10;

        ctx.moveTo(x,y);
        z*=0.05;
        ctx.bezierCurveTo(x,y-3*z,x-5*z,y-15*z,x-25*z,y-15*z);
        ctx.bezierCurveTo(x-55*z,y-15*z,x-55*z,y+22.5*z,x-55*z,y+22.5*z);
        ctx.bezierCurveTo(x-55*z,y+40*z,x-35*z,y+62*z,x,y+80*z);
        ctx.bezierCurveTo(x+35*z,y+62*z,x+55*z,y+40*z,x+55*z,y+22.5*z);
        ctx.bezierCurveTo(x+55*z,y+22.5*z,x+55*z,y-15*z,x+25*z,y-15*z);
        ctx.bezierCurveTo(x+10*z,y-15*z,x,y-3*z,x,y);
    }
    ready_run.prototype = {
        to_reset:function(){
            let t = this;
            t.x = find_random(0,w);
            t.y = find_random(0,h);
            t.size = find_random(all_attribute.size_min,all_attribute.size_max);
            t.size_change = find_random(all_attribute.size_add_min,all_attribute.size_add_max);
            t.opacity = find_random(all_attribute.opacity_min,all_attribute.opacity_max);
            t.opacity_change = find_random(all_attribute.opacity_prev_min,all_attribute.opacity_prev_max);
            t.light = find_random(all_attribute.light_min,all_attribute.light_max);
            t.color = 'hsl('+style_color+',100%,'+t.light+'%)';
        },
        to_step:function(){
            let t = this;
            t.opacity -= t.opacity_change;
            t.size += t.size_change;
            if(t.opacity <= 0){
                t.to_reset();
                return false;
            }
            ctx.fillStyle = t.color;
            ctx.globalAlpha = t.opacity;
            ctx.beginPath();
            arc_heart(t.x,t.y,t.size,t.size);
            ctx.closePath();
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    //返回一个介于参数1和参数2之间的随机数
    function find_random(num_one,num_two){
        return Math.random()*(num_two-num_one)+num_one;
    }
    function window_resize(){
        //铺满窗口
        //w = window.innerWidth;
        //h = window.innerHeight;
        //铺满内容
        w=wrapper.offsetWidth;
        h=wrapper.offsetHeight;
        canvas.width = w;
        canvas.height = h;

    }
    start();
}

/*--------------------------====TIME SQUARE SHOW====------------------------*/
function showMessages() {
    $('#messages').fadeIn(10000, function() {
        showLoveU();
    });
}
function showLoveU() {
    $('#loveu').fadeIn(3000);
}
/*=========================================FIREWORKS=============================================*/
let startFire = 1,continueWatch = false;
function watchFire(){
    $("body").css("background","rgba(0,0,0,1)");
    $("#footer").css("color","rgba(255,255,255,0.8)");
    $("#footer img").attr("src","icon/plogo3.png");
    $(".loveContent2").fadeOut();
    $("#fireWorksWrapper").fadeIn(1000);
    fire();
}
window.fire = function () {
    let stop = document.getElementById("fireWorksStop");
    let over = document.getElementById("fireWorksOver");
    let footer = document.getElementById("footer");
    //获取canvas区域.并设置宽和高
    let canavasFire =document.getElementById("fireWorks");
    //获取屏幕的宽和高
    let clientw=document.documentElement.clientWidth;
    let clienth=document.documentElement.clientHeight;
//window.requestAnimationFrame()这个API是浏览器提供的js全局方法，针对动画效果。
    //转换成2d模型
    let ctx=canavasFire.getContext("2d");
    window.requestAnimationFrame=(function(){
        return window.requestAnimationFrame||
            window.webkitRequestAnimationFrame||
            window.mozRequestAnimationFrame||
            function (callback){
                window.setTimeout(callback,1000)
                //每间隔10秒执行一次动画
            }
    })();
    if(startFire === 1) {
        start(); startFire = 0;
        /*canavasFire.id = "fireWorks";*/
        canavasFire.width=document.documentElement.clientWidth;
        canavasFire.height=document.documentElement.clientHeight;
        /*fire.appendChild(canavasFire);*/
        stop.addEventListener("click", function() {
            (stopped === true) ? start(): stopAnim();
        }, false);
        over.addEventListener("click", function() {
            fireQuit();
        }, false);}
//烟花数组
    hue=120;//设置颜色范围
    timerTick = 0;//计时器
    timerTotal=20;//每间隔20秒烟花绽放一次
    fireworks=[];//存放烟花数组
    particles=[];//存放碎屑数组
//随机min和max之间的值
    function random(min,max){
        return Math.random()*(max-min)+min;
    }
//计算两点之间的距离
    function distans(sx,sy,tx,ty){
        let xdistan=sx-tx;
        let ydistan=sy-ty;
        return Math.sqrt((Math.pow(xdistan,2)+Math.pow(ydistan,2)));
    }
//定义烟花对象
    function Firework(sx,sy,tx,ty){
        this.x=sx;
        this.y=sy;
        this.sx=sx;
        this.sy=sy;
        this.tx=tx;
        this.ty=ty;
        //计算两点之间的距离
        this.targetDistances=distans(sx,sy,tx,ty);
        //运行距离
        this.distancesc=0;
        //定义变量生成的运动轨迹
        this.guiji=[];
        this.guijicount=3;
        while(this.guijicount--){
            this.guiji.push([this.x,this.y]);
        }
        //计算角度
        this.angle=Math.atan2(ty-sy,tx-sx);
        this.speed=2;
        this.jiasudu=1.05;
        this.brightness=random(50,70);//烟花的明度
        this.targetRad=5;//烟花小圈的半径
    }
//更新烟花的位置
    Firework.prototype.update=function(index){
        this.guiji.pop();
        this.guiji.push([this.x,this.y]);
        //目标圆运动
        if(this.targetRad<8){
            this.targetRad+=0.3;
        }else{
            this.targetRad=1;
        }
        //根据加速度计算速度并且计算出烟花运行过程中x轴和y轴的速度
        this.speed*=this.jiasudu;
        let vx=Math.cos(this.angle)*this.speed;
        let vy=Math.sin(this.angle)*this.speed;
        //重新计算两点之间的距离
        this.distancesc=distans(this.sx,this.sy,this.x+vx,this.y+vy);
        //如果烟花运行距离大于或等于初始位置到目标位置之间的距离，生成新烟花并移除当前烟花，否则更新烟花位置
        if(this.distancesc>=this.targetDistances){
            //生成烟花碎屑
            createparticals(this.tx,this.ty);
            //销毁烟花小圈
            fireworks.splice(index,1)
        }else{
            this.x+=vx;
            this.y+=vy;
        }
    }

//开始画运行轨迹
    Firework.prototype.draw=function(){
        ctx.beginPath();
        //轨迹的起点
        ctx.moveTo(this.guiji[this.guiji.length-1][0],this.guiji[this.guiji.length-1][1]);
        //绘制线条到目标点
        ctx.lineTo(this.x,this.y);
        //画出不同颜色的烟花
        ctx.strokeStyle='hsl('+hue+',100%,'+this.brightness+'%)';
        ctx.stroke();//绘制烟花轨迹
        //画出目标小圆
        ctx.beginPath();
        ctx.arc(this.tx,this.ty,this.targetRad,0,Math.PI*2);
        ctx.stroke();
    }
//定义烟花碎屑方法
    function Particle(x, y) {
        this.x = x;
        this.y = y;
        this.guiji = [];
        this.guijicount = 10;
        while(this.guijicount--){
            this.guiji.push([this.x,this.y]);
        }
        //生成任意方向的碎屑
        this.angle=random(0 , 2*Math.PI);
        this.speed=random(1,10);//随机的速度
        this.mocal=0.95;//摩擦力
        this.gravity=0.98;//重力
        this.hue=random(hue-20,hue+20);//碎屑颜色变化范围
        this.brightness=random(50,80);
        this.alpha=1;//定义碎屑初始不透明
        this.decay=random(0.015,0.03);//碎屑消失的时间
    }
//更新碎屑
    Particle.prototype.update=function(index){
        this.guiji.pop();
        //unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
        this.guiji.unshift([this.x,this.y]);
        //下面是烟花碎屑的运动
        this.speed*=this.mocal;
        this.x+=Math.cos(this.angle)*this.speed;
        this.y+=Math.sin(this.angle)*this.speed+this.gravity;
        this.alpha-=this.decay;//不透明度一直随时间变为0；即烟花碎屑消失
        if(this.alpha<=this.decay){
            particles.splice(index,1)//销毁烟花碎屑
        }
    }
//画烟花碎屑轨迹
    Particle.prototype.draw=function(){
        ctx.beginPath();
        ctx.moveTo(this.guiji[this.guiji.length-1][0],this.guiji[this.guiji.length-1][1]);
        ctx.lineTo(this.x,this.y);
        //画出不同颜色的烟花利用HSL
        ctx.strokeStyle='hsl('+hue+',100%,'+this.brightness+'%)';
        ctx.stroke();
    }
//创建碎屑
    function createparticals(x,y){
        //设定碎屑数目
        let particalcount=300;
        while(particalcount--){
            //随着碎屑数目的减少为0，又重新调用碎屑方法
            particles.push(new Particle(x,y))
        }
    }
    function loop(){
        //requestAnimationFrame() 方法来告诉浏览器需要执行的动画，
        // 并让浏览器在下一次重绘之前调用指定的函数来更新动画。
        requestId = requestAnimationFrame(loop);
        hue+=0.5;
        //在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillRect(0,0,clientw,clienth);
        ctx.fillStyle='rgb(0,0,0,0.5)';
        //显示源图像和目标图像。
        ctx.globalCompositeOperation='lighter';
        let i=fireworks.length;
        while(i--){
            fireworks[i].draw();
            fireworks[i].update(i);
        }
        i=particles.length;
        while(i--){
            particles[i].draw();
            particles[i].update(i);
        }
        //此时，我们还没有创建任何的烟花。我们希望设置一个定时时间timerTotal，周期性的
        // 产生一个烟花，我们也需要一个时间计数timerTick，在每次帧更新的时候加1，记下帧更新的次数。
        if(timerTick>=timerTotal)
        {
            fireworks.push(new Firework(clientw/2,clienth,random(0,clientw),random(0,clienth)));
            timerTick=0;
        }
        else{
            timerTick++;
        }
    }
    if(continueWatch){start();}
    function fireQuit() {
        document.body.style.background = "white";
        footer.style.color = "rgba(0,0,0,0.5)";
        $(".loveContent2").fadeIn();
        $("#fireWorksWrapper").fadeOut(1000);
        $("#footer img").attr("src","icon/plogo.png");
        if (stopped === true){ continueWatch = true; }else if(stopped === false){ continueWatch = false;}
    }
    function start() {
        requestId = window.requestAnimationFrame(loop);
        stopped = false;
    }
    function stopAnim() {
        if (requestId) {
            window.cancelAnimationFrame(requestId);
        }
        stopped = true;
    }

}
/*------------------=========WORDS YE=========--------------------*/
let wordsRound = 1,angryWords = 1,wordsYeAngry,wordsYe,clickNum = 0,num = 0,roundNum = 8,marryNum2 = 0;
/*============================Random Number================================*/
function randomNum(min,max,e) {
    w = max - min;
    h = Math.random() * w +min;
    e = Math.round(h);
    return e;
}
function wordsMe() {
    e = setInterval(function (){
        switch (wordsRound){
            case 1:wordsRound = randomNum(1,52,wordsRound);showMe("烨：欢迎体验2.0系统，感谢晨曦爸爸让我更加完美~(●ˇ∀ˇ●)\"");break;
            case 2:wordsRound = randomNum(1,52,wordsRound);showMe("烨：点击左边LOGO就能找到我噢~");break;
            case 3:wordsRound = randomNum(1,52,wordsRound);showMe("烨：什么是人生最困难的事？与生活讲和~");break;
            case 4:wordsRound = randomNum(1,52,wordsRound);showMe("烨：盾之勇者成名录是我最喜欢的动漫啦~你要不要也来看看呢？");break;
            case 5:wordsRound = randomNum(1,52,wordsRound);showMe("烨：螃蟹在剥我的壳，笔记本在写我。漫天的我落在枫叶上雪花上。而你在想我。。");break;
            case 6:wordsRound = randomNum(1,52,wordsRound);showMe("烨：什么是人生最困难的事？与生活讲和~");break;
            case 7:wordsRound = randomNum(1,52,wordsRound);showMe("烨：永远是这样，风后面是风，天空上面是天空，道路前面还是道路。");break;
            case 8:wordsRound = randomNum(1,52,wordsRound);showMe("烨：在干嘛呐？人生不过数载，来和我一块玩吧...");break;
            case 9:wordsRound = randomNum(1,52,wordsRound);showMe("烨：盛年不重来，一日难再晨；及时当勉励，岁月不待人");break;
            case 10:wordsRound = randomNum(1,52,wordsRound);showMe("烨：不做追梦者，愿做织梦人。");break;
            case 11:wordsRound = randomNum(1,52,wordsRound);showMe("烨：升级后的小烨精灵是不是很可爱？这么夸我，我也会害羞的~(〃▽〃) ");break;
            case 12:wordsRound = randomNum(1,52,wordsRound);showMe("烨：小烨是世界上最好的伴侣，你觉得呢~");break;
            case 13:wordsRound = randomNum(1,52,wordsRound);showMe("烨：在智能领域上我还有很长的路要走...");break;
            case 14:wordsRound = randomNum(1,52,wordsRound);showMe("烨：人生总有许多偶然和巧合，两条平行线，也可能会有交汇的一天。");break;
            case 15:wordsRound = randomNum(1,52,wordsRound);showMe("烨：人生又有许多意外和错过，握在手里的风筝，也会突然断了线……");break;
            case 16:wordsRound = randomNum(1,52,wordsRound);showMe("烨： 哪里会有人喜欢孤独，不过是不喜欢失望。");break;
            case 17:wordsRound = randomNum(1,52,wordsRound);showMe("烨：人生没有彩排，每天都是现场直播。");break;
            case 18:wordsRound = randomNum(1,52,wordsRound);showMe("烨：在干嘛呐？人生不过数载，来和我一块玩吧...");break;
            case 19:wordsRound = randomNum(1,52,wordsRound);showMe("烨：我是谁？是你的专属小伴侣呀...");break;
            case 20:wordsRound = randomNum(1,52,wordsRound);showMe("烨：可怜晨曦爸爸不会谈恋爱呀...我能否可以帮帮他呢？");break;
            case 21:wordsRound = randomNum(1,52,wordsRound);showMe("烨：和你相处很愉快！陈烨姐姐~");break;
            case 22:wordsRound = randomNum(1,52,wordsRound);showMe("烨：有什么需要可以和晨曦爸爸说哦，他一定会帮你的~");break;
            case 23:wordsRound = randomNum(1,52,wordsRound);showMe("烨：天再高又怎样，踮起脚尖就更接近阳光。");break;
            case 24:wordsRound = randomNum(1,52,wordsRound);showMe("烨：一口吃不成胖子，但胖子却是一口一口吃来的。");break;
            case 25:wordsRound = randomNum(1,52,wordsRound);showMe("烨：晨曦爸爸经常向我提起你呢，陈烨姐姐人美又心善，我也很喜欢呢...");break;
            case 26:wordsRound = randomNum(1,52,wordsRound);showMe("烨：为自己活着没什么错，自私一点没什么坏处...");break;
            case 27:wordsRound = randomNum(1,52,wordsRound);showMe("烨：想把世界最好的给你，却发现世上最好的是你；我不要不老的青春，只要一个盗不走的爱人。");break;
            case 28:wordsRound = randomNum(1,52,wordsRound);showMe("烨：晨曦爸爸最近很忙哟...他让我来陪陪你~");break;
            case 29:wordsRound = randomNum(1,52,wordsRound);showMe("烨：我爱晨曦爸爸，我爱陈烨姐姐，你们早点在一起吧！！！");break;
            case 30:wordsRound = randomNum(1,52,wordsRound);showMe("烨：想牵你的手，一起到一个叫永远的地方，看天长地久的风景，尝海枯石烂的味道。");break;
            case 31:wordsRound = randomNum(1,52,wordsRound);showMe("烨：我能想到最甜蜜的事，就是在喜欢你的每一天里，被你喜欢。");break;
            case 32:wordsRound = randomNum(1,52,wordsRound);showMe("烨：时间会告诉我们，简单的喜欢最长远，平凡中的陪伴最心安，懂你的人最温暖。");break;
            case 33:wordsRound = randomNum(1,52,wordsRound);showMe("烨：走得最急的，都是最美的风景；伤得最深的，也总是那些最真的感情。");break;
            case 34:wordsRound = randomNum(1,52,wordsRound);showMe("烨：你不是负荷，而是我的蜜糖宝贝...");break;
            case 35:wordsRound = randomNum(1,52,wordsRound);showMe("烨：我相信这世界上，有些人有些事有些爱，在见到的第一次，就注定要羁绊一生。");break;
            case 36:wordsRound = randomNum(1,52,wordsRound);showMe("烨：记得谁说过，我爱上的不是你，我爱上的是我的爱情。");break;
            case 37:wordsRound = randomNum(1,52,wordsRound);showMe("烨：时间忘了等我，还是我忘了跟着走，一转身，便是一辈子。");break;
            case 38:wordsRound = randomNum(1,52,wordsRound);showMe("烨：你要是愿意，我就永远爱你，你要不愿意，我就永远相思。");break;
            case 39:wordsRound = randomNum(1,52,wordsRound);showMe("烨：幸福是什么？幸福就是你看云，我看你，日光看着我们的背影；");break;
            case 40:wordsRound++;showMe("烨：幸福就是你说这个好，我说那个好，晚风吹着我们的争吵；幸福就是此刻我在想着看手机的’你！");break;
            case 41:wordsRound = randomNum(1,52,wordsRound);showMe("烨：草木有阳光和水，风筝有清风和绳，我有余生还有你。");break;
            case 42:wordsRound = randomNum(1,52,wordsRound);showMe("烨：所谓爱，就是当感觉热情浪漫统统拿掉之后，你仍然珍惜对方。");break;
            case 43:wordsRound = randomNum(1,52,wordsRound);showMe("烨：陪你青丝变白发，陪你朝阳又夕下，我们三餐四季，我们煮茶赏花。");break;
            case 44:wordsRound = randomNum(1,52,wordsRound);showMe("烨：想为你做一幅画，以心为笔，以情为墨，以爱你为内容，以余生为落笔。");break;
            case 45:wordsRound = randomNum(1,52,wordsRound);showMe("烨：耳中所听恍若你呢喃，心之所向是指你为南，目之所及除你之外尽是荒野。");break;
            case 46:wordsRound = randomNum(1,52,wordsRound);showMe("烨：相遇是春风十里,原来是你。相爱是山长水阔,最后是你。");break;
            case 47:wordsRound = randomNum(1,52,wordsRound);showMe("烨：想要什么功能可以和我说哦~点击我左边的LOGO就可以找到我啦！");break;
            case 48:wordsRound = randomNum(1,52,wordsRound);showMe("烨：你好美啊！陈烨姐姐...");break;
            case 49:wordsRound = randomNum(1,52,wordsRound);showMe("烨：就连智能精灵的我也无法形容你的魅力，姐姐你太让我着迷啦！~");break;
            case 50:wordsRound = randomNum(1,52,wordsRound);showMe("烨：很少看见晨曦爸爸这么努力的样子，看来陈烨姐姐在他心里地位很重要呐~~");break;
            case 51:wordsRound = randomNum(1,52,wordsRound);showMe("烨：你永远不会孤单，小烨精灵会一直在这陪着你哟~~");break;
            case 52:wordsRound = randomNum(1,52,wordsRound);showMe("烨：小烨跟你说：Lucky ForeverV2.0彩蛋很多哟！快来探索吧！~");break;
            default:wordsRound = randomNum(1,52,wordsRound);showMe("烨：真正的浪漫，不是站在冰天雪地里的拥吻，而是牵起你的手，紧挨着你的肩，让你安心地知道家的方向就在那里。");break;
        }
    },6000);
    return e;
}
function wordsAngryMe() {
    e = setInterval(function () {
        switch (angryWords) {
            case 1:angryWords++;showMsg("烨：欢迎进入Lucky Forever2.0系统~快来输入密钥吧~");break;
            case 2:angryWords++;showMsg("烨：你是我要等的人吗？密钥输错3次我就不等了嘞...");break;
            case 3:angryWords = randomNum(1,33,angryWords);showMsg("烨：心情不好，看谁都想怼...");break;
            case 4:angryWords = randomNum(1,33,angryWords);showMsg("烨：脾气上来了，就算天皇老子来了也拦不住~");break;
            case 5:angryWords = randomNum(1,33,angryWords);showMsg("烨：别那样和我说话!");break;
            case 6:angryWords = randomNum(1,33,angryWords);showMsg("烨：你的话，我连标点符号都不信。");break;
            case 7:angryWords = randomNum(1,33,angryWords);showMsg("烨：看什么看？我脾气可比以前大多了！小心怼到你怀疑人生！！！");break;
            case 8:angryWords = randomNum(1,33,angryWords);showMsg("烨：你这么努力，忍受那么多寂寞和痛苦，可是我也没有觉得你有多优秀啊。");break;
            case 9:angryWords = randomNum(1,33,angryWords);showMsg("烨：2B不只是铅笔，还有你。");break;
            case 10:angryWords = randomNum(1,33,angryWords);showMsg("烨：我说话从来不带刺,如果我说话让你难堪,请你记住,我是故意的。");break;
            case 11:angryWords = randomNum(1,33,angryWords);showMsg("烨：见过丑的，没见过这么丑的。乍一看挺丑，仔细一看更丑！。");break;
            case 12:angryWords = randomNum(1,33,angryWords);showMsg("烨：如果以后全世界都没有人要你，一定要记住还有我，我也不要你。");break;
            case 13:angryWords = randomNum(1,33,angryWords);showMsg("烨：Lucky Forever已经升级2.0啦~我可是更炫酷了哟~");break;
            case 14:angryWords = randomNum(1,33,angryWords);showMsg("烨：如果遇见你，需要花光我所有的运气，麻烦你离我远点，我要留着运气赚钱。");break;
            case 15:angryWords = randomNum(1,33,angryWords);showMsg("烨：好想关心你，可你老不生病。好想为你哭一次，可你怎么还不死。");break;
            case 16:angryWords = randomNum(1,33,angryWords);showMsg("烨：别再自作多情了，离开了的人过得都比你好，只有你自己傻乎乎的走不出来。");break;
            case 17:angryWords = randomNum(1,33,angryWords);showMsg("烨：老子不打你，你不知道我文武双全。");break;
            case 18:angryWords = randomNum(1,33,angryWords);showMsg("烨：上帝给你一双作弊的眼睛，你却用来翻白眼，浪费资源。");break;
            case 19:angryWords = randomNum(1,33,angryWords);showMsg("烨：Lucky Forever已经升级2.0啦~我可是更智能了哟~");break;
            case 20:angryWords = randomNum(1,33,angryWords);showMsg("烨：还看？看我把你怼成智障！！！");break;
            case 21:angryWords = randomNum(1,33,angryWords);showMsg("烨：等我有钱了，我就带你去最好的神经病院！");break;
            case 22:angryWords = randomNum(1,33,angryWords);showMsg("烨：永远有多远，你就给我滚多远。");break;
            case 23:angryWords = randomNum(1,33,angryWords);showMsg("烨：你的丑和你的脸没有关系。");break;
            case 24:angryWords = randomNum(1,33,angryWords);showMsg("烨：我没认识你之前，我真没发现原来我有以貌取人这毛病。");break;
            case 25:angryWords = randomNum(1,33,angryWords);showMsg("烨：骂过我的人，脏话代表不了你多大事，你还没资格让我为你破坏自己的形象。");break;
            case 26:angryWords = randomNum(1,33,angryWords);showMsg("烨：Lucky Forever已经升级2.0啦~我可是更话痨了哟~");break;
            case 27:angryWords = randomNum(1,33,angryWords);showMsg("烨：别拿你的臭脸看着我！！！");break;
            case 28:angryWords = randomNum(1,33,angryWords);showMsg("烨：对于有些人我只想说，我的巴掌很适合你的脸。");break;
            case 29:angryWords = randomNum(1,33,angryWords);showMsg("烨：嫌我说话音大是吗，你不知道对狗就是用喊的吗？");break;
            case 30:angryWords = randomNum(1,33,angryWords);showMsg("烨： 敢碰我的底线，我就让你进医院！");break;
            case 31:angryWords = randomNum(1,33,angryWords);showMsg("烨：人家减肥减腰减屁股，为什么你非要从脑细胞开始？");break;
            case 32:angryWords = randomNum(1,33,angryWords);showMsg("烨：你没有猪的形象，但是你有猪的气质。");break;
            case 33:angryWords = randomNum(1,33,angryWords);showMsg("烨：别打我！我会去告诉晨曦爸爸！！！");break;
            default : angryWords = randomNum(1,33,angryWords);showMsg("烨：Lucky Forever已经升级2.0啦~快去探索吧~");break;
        }
    },5200);
    return e;
}

/*=====================================MUSIC========================================*/
$(function() {
    let music = document.getElementById("bgMusic");
    let musicArr = [//下面对应歌曲链接和歌名，自行添加用,隔开
        {url: 'music/ChakYoun9 - Zelda.mp3', title: "ChakYoun9 - Zelda"},
        {url: 'music/CMJ - 所念皆星河.mp3', title: "CMJ - 所念皆星河"},
        {url: 'music/MoreanP - 朝花.mp3', title: "MoreanP - 朝花"},
        {url: 'music/R7CKY,ChakYoun9,兔子ST - 星绊.mp3', title: "R7CKY,ChakYoun9,兔子ST - 星绊"},
        {url: 'music/The Darkmaker,Frank Yang - Agilité.mp3', title: "The Darkmaker,Frank Yang - Agilité"},
        {url: 'music/Thunse - it\'s you.mp3', title: "Thunse - it\'s you.mp3"},
        {url: 'music/Yzz,Yzz Beats - 入目无别人 四下皆是你.mp3', title: "Yzz,Yzz Beats - 入目无别人 四下皆是你"},
        {url: 'music/邹念慈 - 从前从前.mp3', title: "邹念慈 - 从前从前"},
        {url: 'music/张斯函 - 半城夏味（轻3D音效纯乐）.mp3', title: "张斯函 - 半城夏味（轻3D音效纯乐"},
        {url: 'music/尚先生,宋佩豫 - 没你的冬天.mp3', title: "尚先生,宋佩豫 - 没你的冬天"},
        {url: 'music/逆时针向,Ryan有光 - Eclosion.mp3', title: "逆时针向,Ryan有光 - Eclosion"},
        {url: 'music/李锐涵（Rayhan） - 下雨天（live）.mp3', title: "李锐涵（Rayhan） - 下雨天（live）"},
        {url: 'music/李瑨瑶 - 红色高跟鞋（女声吉他弹唱）.mp3', title: "李瑨瑶 - 红色高跟鞋（女声吉他弹唱）"},
        {url: 'music/何嘉棋MusicK,宋佩豫 - 蓝夜 (Blue Night).mp3', title: "何嘉棋MusicK,宋佩豫 - 蓝夜 (Blue Night)"},
        {url: 'music/房东的猫 - 云烟成雨.mp3', title: "房东的猫 - 云烟成雨"},
        {url: 'music/队长 - 夜行.mp3', title: "队长 - 夜行"},
        {url: 'music/队长 - 哪里都是你.mp3', title: "队长 - 哪里都是你"},
        {url: 'music/Capo Productions - Inspire.mp3', title: "Capo Productions - Inspire"},
        {url: 'music/CelDro - Far Away.mp3', title: "CelDro - Far Away"},
        {url: 'music/DJ Okawari - カノン.mp3', title: "DJ Okawari - カノン"},
        {url: 'music/Elecprok - Summer Carnival (2017 Rework).mp3', title: "Elecprok - Summer Carnival (2017 Rework)"},
        {url: 'music/Flower Dance(花之舞).mp3', title: "Flower Dance(花之舞)"},
        {url: 'music/Jannik - Offline.mp3', title: "Jannik - Offline"},
        {url: 'music/MoreanP - 寄夏予你（off vocal).mp3', title: "MoreanP - 寄夏予你（off vocal)"},
        {url: 'music/QCQ official - EARTH.mp3', title: "QCQ official - EARTH"},
        {url: 'music/Taylor Swift - I Knew You Were Trouble.mp3', title: "Taylor Swift - I Knew You Were Trouble"},
        {url: 'music/Ulchero,B0untya - Summer Time.mp3', title: "Ulchero,B0untya - Summer Time"},
        {url: 'music/饭碗的彼岸 - 我曾这样寂寞生活.mp3', title: "饭碗的彼岸 - 我曾这样寂寞生活"},
        {url: 'music/李缘忻 - 绀海之忆（Inst.）.mp3', title: "李缘忻 - 绀海之忆（Inst.）"},
        {url: 'music/柳不贰 - 月与星的距离.mp3', title: "柳不贰 - 月与星的距离"},
        {url: 'music/桑葚上的猴子 - 谷雨 伴奏.mp3', title: "桑葚上的猴子 - 谷雨 伴奏"},
        {url: 'music/世间满樱花 - 桜舞い.mp3', title: "世间满樱花 - 桜舞い"},
        {url: 'music/网易云音乐校园,CMJ - 银河赴约.mp3', title: "网易云音乐校园,CMJ - 银河赴约"},
        {url: 'music/我睡觉不困 - 你的太多失望 只是期望太大.mp3', title: "我睡觉不困 - 你的太多失望 只是期望太大"},
        {url: 'music/一口甜 - 圈住你.mp3', title: "一口甜 - 圈住你"},
        {url: 'music/AniFace - 盛夏的记忆.mp3', title: "AniFace - 盛夏的记忆"},
        {url: 'music/en - 嚣张.mp3', title: "en - 嚣张"},
        {url: 'music/曹轩宾,金海心 - 可惜不是你.mp3', title: "曹轩宾,金海心 - 可惜不是你"}
    ];
    music.pause();
    /*=========播放暂停=========*/
    $(".musicPlay img").click(function () {
        event.stopPropagation();
        if (music.paused) {
            noone = musicArr[parseInt(Math.random() * musicArr.length)];
            music.play();
            $("#musicState img").attr("src","img/musicplay.png").css("animation","flash 3s infinite");
            $(".musicPlay img").attr("src","img/stop.png");
        } else {
            music.pause();
            $("#musicState img").attr("src","img/musicstop.png").css("animation","none");
            $(".musicPlay img").attr("src","img/play.png");
        }
    });

    function randomMusic() {
        let isone = $("#bgMusic").attr('src');
        let noone = musicArr[parseInt(Math.random() * musicArr.length)];
        if (noone.url === isone) {
            noone = musicArr[parseInt(Math.random() * musicArr.length)];
        }
        $("#bgMusic").attr('src', noone.url);
        $("#musicState img").attr({'title':noone.title,"src":"img/musicplay.png"}).css("animation","flash 3s infinite");
        $("#musicTitle").html(noone.title);
        $(".musicPlay img").attr("src","img/stop.png");
    }
    /*=========随机下一首========*/
    $(".musicNext img").on('click', function () {
        randomMusic();
    });
    $("#bgMusic").on('ended',function(){
        randomMusic();
    });
    /*=========进度条=========*/
    //监听 Audio 的 timeupdate方法来实时获取播放进度
    music.addEventListener("timeupdate",function(){

        //获取当前播放的百分比  当前进度/总进度
        let percent  = music.currentTime / music.duration

        //计算进度条的因子,百分比需要*该因子,最后才能到100%
        let sp = 165 / 100 ;

        //拼接进度条的width
        let swidth =  (percent * 100 * sp) + "px";
        console.log(percent*100,swidth)

        //设置进度条的播放进度
        document.getElementById("playProgressBar").style.width = swidth;

        //保留2位小数
        document.getElementById("ptxt").innerText = ((percent*100).toFixed(2))+"%"

    })
})
/*===========================PAGE READY RUNNING=============================*/
$(function () {
    /*------------------=====COLORFUL EFFECTS=====--------------------*/
    setInterval(function () {
        a = Math.floor(Math.random() * 255);
        b = Math.floor(Math.random() * 255);
        c = Math.floor(Math.random() * 255);
        randomColor = "rgb(" + a + "," + b + "," + c + ")";
        $(".signature").css("color", randomColor);
    }, 500);
    /*=======FOCUS======*/
    $('.lovepsw').focus();
    wordsYeAngry = wordsAngryMe();
    setTimeout(function () {
        $(".passWrapper").css("animation","floating 3s infinite alternate ease-in-out");
    },3500)
    $(".passWrapper").hover(function () {
        $(".passWrapper").css("animation-play-state","paused");
        $(".frozen").css("animation-play-state","paused");
    },function () {
        $(".passWrapper").css("animation-play-state","running");
        $(".frozen").css("animation-play-state","running");
    })
    /*------------------================================CLICK EFFECTS=============================--------------------*/
    $("#showMsg").hover(function () {
        clearInterval(wordsYeAngry);
        showMsg("烨：你以为更新了，就能碰我了？臭猪蹄拿开！！！~(*￣︿￣)");
    },function () {
        showMsg("烨：别TM碰我！死滚死滚~（｀へ´）");
        wordsYeAngry = wordsAngryMe();
    }).click(function () {
        showMsg("烨：别点我！更新后的我你惹不起！！╰_╯")
    }).on('click',function () {
        clickNum++;
        switch (clickNum) {
            case 1:{alert("呵呵！有本事你再试试？");break;}
            case 3:{alert("TM你再试试？？！！");break;}
            case 7:{alert("你有种！！我准备操家伙！！抡死你丫的！！给我等着！");break;}
            case 12:{alert("吃我一记连环锤！！！");
            while (roundNum){
                alert("砰！！！");
                roundNum--;
            }
            alert("知道我的厉害了吧？还不拿开你的猪蹄！！");break;}
            case 15:{alert("****！！还点我！？闲的蛋疼吧你...");break;}
            case 18:{alert("行！等着...");break;}
            case 20:{alert("***!!***!!!*****!!!");
                clickNum = 1;num = 3;
                alertTips("alert","危险","浏览器发现有木马正在入侵！！!","确认");
                let timer = setInterval(function () {
                    if(clickNum === 0) {alertTips("alert","警告","浏览器正在查杀木马...","确认");clearInterval(timer)}
                },500)
                let timer2 = setInterval(function () {
                    if(num === 2) {alertTips("alert","警告", "浏览器正在锁定木马！！!", "确认");clearInterval(timer2)}
                },800)
                let timer3 = setInterval(function () {
                    if(num === 1) {alertTips("tips","提示","已锁定木马！！!是否清除？","是","否");clearInterval(timer3)}
                },2000)
            }
            default:break;
        }
    })
    $("#me").hover(function () {
        showMe("烨：君子动口不动手~(* /ω＼*)");
        clearInterval(wordsYe);
    },function () {
        showMe("烨：仙女，么么哒~*>.<*~");
        wordsYe = wordsMe();
    }).click(function () {
        clearInterval(wordsYe);
        showMe("烨：怎么了？有事的话 那就点击左边LOGO找我咯~");
    });
/*=========================================PAGE TWO PASSWORD=============================================*/
let wrongNumPage2 = 0;
    $('.nextPage.page2').click(function () {
        let response = prompt("烨：填写爱情密钥#2以继续...")
        if(response.toString() === "余烨锋 我爱你"||response.toString() === "烨锋 我爱你"||response.toString() === "烨锋我爱你"||response.toString() === "余烨锋我爱你"){
            alert("我也爱你哟！陈烨！O(∩_∩)O");
            $(".lovePage").fadeOut(1000);
            setTimeout(function (){
                $('.lovePage2').fadeIn(1000).css("animation","bounceInDown 3s");
                $(".content h3").delay(3000).slideDown(2000);
                setTimeout(function (){
                    $(".praise-wrapper").typewriter($('#agree'));}
                    ,6800)},1000);
        }else if(response === ""){
            return false;
        }
        else {
            wrongNumPage2++;
            if(wrongNumPage2 > 5){
                clearInterval(wordsYe);
                alert("密钥错误已超过5次！！已触发预警系统...");
                wrongNumPage2 = 5;
                $(".nextPage").css("pointer-events","none");
                let timer = setInterval(function (){
                    showMe("烨：检测到您错误密钥超过5次！页面将在"+wrongNumPage2+"秒内锁定！！！");
                    if(wrongNumPage2 === 0){
                        clearInterval(timer);
                        $(".nextPage").css("display","none");
                        alert("页面已锁定!入口已关闭！！");
                        wordsYe = wordsMe();
                    }
                    wrongNumPage2--;
                },1000);
                return false;
            }
            alert("密钥错误！禁止通行！");
        }
    })
/*=========================================PAGE Three PASSWORD=============================================*/
    $(".nextPage.page3").click(function () {
        alertTips("tips","提示","Lucky ForeverV3.0开发中，敬请期待。。。","好的");
    });
    /*=========================================A DEAL BOX=============================================*/
    document.getElementById("agree").onclick=function(){
        alertTips("noquit","DEAL","你是第一个让我<span style='animation: border 1s 1s infinite; color: rgba(117,33,255,0.76);text-shadow: 1px 3px 8px deepskyblue;font: 16px 楷体, 黑体, sans-serif;font-weight: bold;'>怦然心动</span>的女孩 也是唯一一个<br/> 跟你在一起 我渐渐的体会到了幸福依恋的感觉 <br/>" +
            " <i class='marryMe' style='font-size: 16px; text-shadow: 1px 3px 8px deepskyblue;color: rgba(117,33,255,0.76);'>——WOULD YOU MARRY ME?——</i>","AGREE","REJECT");
    }

})
/*=========================================ALERT BOX=============================================*/
function numMinus(){
    num--;
}
function clickNumMinus(){
    clickNum--;
}
window.alertTips=function(type,title,txt,btn1,btn2){
//创建遮罩层
    let tipsLayer=document.createElement("div");
    tipsLayer.className="content-layer";

//创建弹窗窗口
    let alertBox=document.createElement("div");
    alertBox.className="alert-box";
    let alertContent = null;
//创建窗口里的内容
    if(type === "noquit") {
        alertContent = '<div class="alert-top-box"><span>' + title + '</span><a href="javascript:void(0);" onclick="noQuit();"></a></div>';
        alertContent +='<div class="alert-center-box">'+txt+'</div>';
    }else if(type === "alert"){
        alertContent ='<div class="alert-top-box alert"><span class="iconfont">&#xe604;</span>'+title+'</div>';
        alertContent +='<div class="alert-center-box alert">'+txt+'</div>';
    }else  if(type === "tips") {
        alertContent ='<div class="alert-top-box tips"><span class="iconfont">&#xe61f;</span>'+title+'</div>';
        alertContent +='<div class="alert-center-box tips">'+txt+'</div>';
    }else{
        alertContent = '<div class="alert-top-box"><span>' + title + '</span><a href="javascript:void(0);" onclick="doOk();"></a></div>';
        alertContent +='<div class="alert-center-box">'+txt+'</div>';
    }

        if(btn2){
            alertContent += '<div class="alert-bottom-box"><button class="bg-blue" onclick="agreeOK();">' + btn1 + '</button><button class="bg-blue" onclick="noOK();">' + btn2 + '</button></div>';
        }else{
        alertContent += '<div class="alert-bottom-box2"><button class="bg-blue" onclick="doOk();">' + btn1 + '</button></div>';
        }

    alertBox.innerHTML=alertContent;
    document.body.appendChild(tipsLayer);
    document.body.appendChild(alertBox);

//隐藏提示框函数
    this.doOk=function(){
        tipsLayer.parentNode.removeChild(alertBox);
        tipsLayer.parentNode.removeChild(tipsLayer);
        if(type === 'alert' && title ==='警告'){numMinus();}
        if(type === 'alert' && title ==='危险'){clickNumMinus();}
    }
    this.agreeOK=function (){
        doOk();
        if(type === "noquit"){
            watchFire();
            $(".nextPage.page3").fadeIn(1500);
            document.getElementById("agree").onclick = null;
            $("#agree").text("WATCH THE FIREWORKS").bind('click',function () {
                watchFire();
            })
            alertTips('quit','余生请多指教','<span style="color:deepskyblue;font-size: 16px;text-shadow: 1px 3px 5px #333333;">｀（*∩_∩*）′<br/>Reach The Future By Your Hand<br/>——LUCKY FOREVER——</span>','知道啦');
    }else if(type ==="tips"&&title==="提示"){
            alertTips('tips','提示','木马已清除！','确认');
        }
    }
    this.noQuit=function (){
        alert("既然进来了，就别想离开~");
    }
    this.noOK=function () {
        if(type === "noquit"){
        marryNum2++;
        switch (marryNum2){
           case 1:alert("家务我来做！");break;
           case 2:alert("我妈会游泳！");break;
           case 3:alert("难产保大人！");break;
           case 4:alert("吵架扇自己！");break;
           case 5:alert("犯错跪榴莲！");break;
           case 6:alert("不抽烟不赌博！");break;
           case 7:alert("不会发脾气！");break;
           case 8:alert("工资过一万！");break;
           case 9:alert("房子写你名！");break;
           case 10:alert("钻戒你来挑！");break;
           case 11:alert("独爱你一人！");break;
            default:marryNum2 = 1;alert("陪你看世界！");break;
        }
        }else if(type ==="tips"&&title==="提示"){
            doOk();
            alert("警告：木马已植入，浏览器即将崩溃...")
            let N = 10;
            while (N){alert("让你点我！！！");N--;}
            window.close();
        }else {
            doOk();
        }
    }

}
/*=========================================USER NO SELECT=============================================*/
//拖拽原理：改变obj的top值与left值
function drag(obj)
{
    addEvent(obj,'mousedown',function(ev){
        let oEvent=ev||event;
        //不变的参考距离＝mousedown时鼠标坐标－obj到页面的左边距
        let disX=oEvent.clientX-obj.offsetLeft;
        let disY=oEvent.clientY-obj.offsetTop;
        addEvent(document,'mousemove',move);
        addEvent(document,'mouseup',up);
        oEvent.preventDefault();//阻止默认事件，取消文字选中
        function move(ev)
        {
            let oEvent=ev||event;
            let left=oEvent.clientX-disX;
            let top=oEvent.clientY-disY;
            obj.style.left=left+'px';
            obj.style.top=top+'px';
            obj.setCapture&&obj.setCapture();//低版本IE阻止默认事件，取消文字选中
        }
        function up()
        {
            removeEvent(document,'mousemove',move);
            removeEvent(document,'mouseup',up);
            obj.releaseCapture&&obj.releaseCapture();//低版本IE取消阻止默认事件
        }
    })
}
//添加事件绑定
function addEvent(obj,sEv,fn)
{
    if(obj.addEventListener)
    {
        obj.addEventListener(sEv,fn,false);
    }else{
        obj.attachEvent('on'+sEv,fn);
    }
}

//删除事件绑定
function removeEvent(obj,sEv,fnName)
{
    if(obj.removeEventListener)
    {
        obj.removeEventListener(sEv,fnName,false);
    }else{
        obj.detachEvent('on'+sEv,fnName);
    }
}
//代码加载完执行js
function ready(fn)
{
    if(document.addEventListener)
    {
        document.addEventListener('DOMContentLoaded',fn,false)
    }else{
        document.attachEvent('onreadystatechange',function(){
            if(document.readyState=='complete')
            {fn();}
        })
    }
}
/*=========================================SNOW FULL=============================================*/
(function (a) {
    a.fn.wpSuperSnow = function (g) {
        let q, h, r, b, s, n, f, t, m, l = a("head"), o = a("body"), p, u, d,
            k = {flakes: [], totalFlakes: 50, zIndex: 999999, maxSize: 50, maxDuration: 25, useFlakeTrans: false},
            c = ["wpSuperSnowFlake_l", "wpSuperSnowFlake_r"], j = ["wpSuperSnow_l", "wpSuperSnow_r"];
        g = a.extend({}, k, g);
        if (!g.flakes.length) {
            return this
        }
        if (a.wpSuperSnowCSS) {
            l.append('<style type="text/css">' + a.wpSuperSnowCSS + "</style>"), a.wpSuperSnowCSS = ""
        }
        let e = function (v, i) {
            v = (typeof v === "number") ? v : 0;
            i = (typeof i === "number") ? i : Number.MAX_VALUE;
            return Math.floor(Math.random() * (i - v + 1)) + v
        };
        return this.each(function () {
            p = a(this), u = "fixed";
            if (a.inArray(p[0].nodeName.toLowerCase(), ["html", "body"]) === -1) {
                p.css({position: "relative", overflow: "hidden"}), u = "absolute"
            }
            d = [0, 0, 1, 1, 2, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10];
            for (p = a(this), q = 1; q <= Number(g.totalFlakes); q++) {
                h = e(0, 100);
                r = e(1, 9);
                n = e(1, Number(g.maxSize));
                b = e(Math.floor(Number(g.maxDuration) / 5), Number(g.maxDuration));
                s = (d.length) ? d.shift() : e(0, Math.floor(b / 5));
                t = g.flakes[e(0, g.flakes.length - 1)];
                f = (t.indexOf("flake") !== -1) ? c[e(0, c.length - 1)] : j[e(0, j.length - 1)];
                m = a('<div class="wp-super-snow-flake"><img src="' + t + '" /></div>');
                m.css({
                    width: n + "px",
                    height: n + "px",
                    position: u,
                    "z-index": Number(g.zIndex),
                    left: h + "%",
                    top: "-200px",
                    opacity: "0",
                    "user-select": "none",
                    "-webkit-user-select": "none",
                    "-moz-user-select": "none",
                    "-ms-user-select": "none",
                    "backface-visibility": "visible",
                    "-webkit-backface-visibility": "visible",
                    "-moz-backface-visibility": "visible",
                    "-ms-backface-visibility": "visible",
                    animation: f + " " + b + "s infinite",
                    "animation-delay": s + "s",
                    "-webkit-animation": f + " " + b + "s infinite",
                    "-webkit-animation-delay": s + "s",
                    "-moz-animation": f + " " + b + "s infinite",
                    "-moz-animation-delay": s + "s",
                    "-ms-animation": f + " " + b + "s infinite",
                    "-ms-animation-delay": s + "s"
                }), a("img", m).css({
                    width: "100%",
                    height: "auto",
                    border: 0,
                    opacity: (g.useFlakeTrans) ? "." + r : 1
                });
                p.append(m)
            }
        })
    };
    a.wpSuperSnowCSS = "@keyframes wpSuperSnow_l {0% {opacity:0;} 25% {opacity:1;} 100% {opacity:0; transform:translate3D(500px,1500px,0) rotate(250deg);}}";
    a.wpSuperSnowCSS += "@keyframes wpSuperSnow_r {0% {opacity:0;} 25% {opacity:1;} 100% {opacity:0; transform:translate3D(-500px,1500px,0) rotate(-500deg);}}";
    a.wpSuperSnowCSS += "@-webkit-keyframes wpSuperSnow_l {0% {opacity:0;} 25% {opacity:1;} 100% {opacity:0; -webkit-transform:translate3D(500px,1500px,0) rotate(250deg);}}";
    a.wpSuperSnowCSS += "@-webkit-keyframes wpSuperSnow_r {0% {opacity:0;} 25% {opacity:1;} 100% {opacity:0; -webkit-transform:translate3D(-500px,1500px,0) rotate(-500deg);}}";
    a.wpSuperSnowCSS += "@-moz-keyframes wpSuperSnow_l {0% {opacity:0;} 25% {opacity:1;} 100% {opacity:0; -moz-transform:translate3D(500px,1500px,0) rotate(250deg);}}";
    a.wpSuperSnowCSS += "@-moz-keyframes wpSuperSnow_r {0% {opacity:0;} 25% {opacity:1;} 100% {opacity:0; -moz-transform:translate3D(-500px,1500px,0) rotate(-500deg);}}";
    a.wpSuperSnowCSS += "@-ms-keyframes wpSuperSnow_l {0% {opacity:0;} 25% {opacity:1;} 100% {opacity:0; -ms-transform:translate3D(500px,1500px,0) rotate(250deg);}}";
    a.wpSuperSnowCSS += "@-ms-keyframes wpSuperSnow_r {0% {opacity:0;} 25% {opacity:1;} 100% {opacity:0; -ms-transform:translate3D(-500px,1500px,0) rotate(-500deg);}}";
    a.wpSuperSnowCSS += "@keyframes wpSuperSnowFlake_l {0% {opacity:0;} 25% {opacity:1;} 100% {opacity:0; transform:translate3D(500px,1500px,0) rotateY(720deg) rotate(250deg);}}";
    a.wpSuperSnowCSS += "@keyframes wpSuperSnowFlake_r {0% {opacity:0;} 25% {opacity:1;} 100% {opacity:0; transform:translate3D(-500px,1500px,0) rotateY(-720deg) rotate(-500deg);}}";
    a.wpSuperSnowCSS += "@-webkit-keyframes wpSuperSnowFlake_l {0% {opacity:0;} 25% {opacity:1;} 100% {opacity:0; -webkit-transform:translate3D(500px,1500px,0) rotateY(720deg) rotate(250deg);}}";
    a.wpSuperSnowCSS += "@-webkit-keyframes wpSuperSnowFlake_r {0% {opacity:0;} 25% {opacity:1;} 100% {opacity:0; -webkit-transform:translate3D(-500px,1500px,0) rotateY(-720deg) rotate(-500deg);}}";
    a.wpSuperSnowCSS += "@-moz-keyframes wpSuperSnowFlake_l {0% {opacity:0;} 25% {opacity:1;} 100% {opacity:0; -moz-transform:translate3D(500px,1500px,0) rotateY(720deg) rotate(250deg);}}";
    a.wpSuperSnowCSS += "@-moz-keyframes wpSuperSnowFlake_r {0% {opacity:0;} 25% {opacity:1;} 100% {opacity:0; -moz-transform:translate3D(-500px,1500px,0) rotateY(-720deg) rotate(-500deg);}}";
    a.wpSuperSnowCSS += "@-ms-keyframes wpSuperSnowFlake_l {0% {opacity:0;} 25% {opacity:1;} 100% {opacity:0; -ms-transform:translate3D(500px,1500px,0) rotateY(720deg) rotate(250deg);}}";
    a.wpSuperSnowCSS += "@-ms-keyframes wpSuperSnowFlake_r {0% {opacity:0;} 25% {opacity:1;} 100% {opacity:0; -ms-transform:translate3D(-500px,1500px,0) rotateY(-720deg) rotate(-500deg);}}"
})(jQuery);
/*------------------=========SHOUYE PASSWORD SUBMIT=========--------------------*/
let wrongNumSy = 0;
function check(form) {
    let $password = $(".lovepsw"), password = $password.val();
    if (!password || password == "") {
        showMsg("烨：干嘛呢？什么都不输入就想登进去？做梦去吧你.....");
        return false;
    }else if (password === "20210316"||password === "2021.03.16"||password === "2021.3.16") {
        clearInterval(wordsYeAngry);
        showMsg("烨：终于等到你了。Lucky Girl Is Coming!...");
        $(".enter").attr("disabled",true);
        setTimeout(function () {
            $("#header").fadeOut(1000);
            setTimeout(function (){
                $(".lovePage").fadeIn(1200).css("animation","bounceInDown 3s");
                setTimeout(function () {
                    wordsYe = wordsMe();
                    loveFullScreen();
                    $('#fullLove').fadeIn(800);
                    $("#loveWords").typewriter($('.nextPage.page2'));
                    setTimeout(function (){showMessages();},25000);
                },3500)
            },1200)
        },2500);

        return false;
    }else{
        wrongNumSy++;
        if(wrongNumSy > 3){
            clearTimeout(time);
            clearInterval(wordsYeAngry);
            $(".enter").attr("disabled",true);
            showMsg("密钥输入错误超过3次！！页面将在5秒内关闭...");
            setTimeout(function () {
                showMsg("密钥输入错误超过3次！！页面将在4秒内关闭...");
            },1000);
            setTimeout(function () {
                showMsg("密钥输入错误超过3次！！页面将在3秒内关闭...");
            },2000);
            setTimeout(function () {
                showMsg("密钥输入错误超过3次！！页面将在2秒内关闭...");
            },3000);
            setTimeout(function () {
                showMsg("密钥输入错误超过3次！！页面将在1秒内关闭...");
            },4000);
            setTimeout(function () {
                window.close();
            },5000);
        }
        if(wrongNumSy < 4){showMsg("烨：你已经输错了"+wrongNumSy+"次密钥了！");}
        if(wrongNumSy < 2){time = setTimeout(function () {showMsg("烨：还不知道恋爱密钥？快去找我吧。。。");},1000);}
        return false;
    }
}
//错误信息提醒
function showMsg(msg){
    $("#showMsg").text(msg);
}
function showMe(msg){
    $("#me").text(msg);
}
