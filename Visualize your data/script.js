// const cursor = document.querySelector('.cursor');

// document.addEventListener(mousemove, e =>{
//     cursor.setAttribute('style', )
// });
var main = document.getElementById("main");
var home = document.getElementById("home");
var create = document.getElementById("create");
var create_menu = document.getElementById("create_menu");
var home_button = document.getElementById("home_button");
var next_button = document.getElementById("next");
var entry_handler = document.getElementById("entry_handler");
var entry_num = document.getElementById("entry_num");
var create_button = document.getElementById("create_chrt");
var back_bttn = document.getElementById("back");
var main_back = document.getElementById("main_back");
var save_chrt = document.getElementById("save_chrt");
var help = document.getElementById("help");
var help_button = document.getElementById("help_button");
var canvas = document.getElementById("canvas");
var entries;
var chart;
Chart.defaults.global.defaultFontColor = 'white';
Chart.defaults.global.defaultFontSize = 14;
Chart.defaults.global.defaultFontStyle = 'bold';
Chart.defaults.global.defaultFontFamily = 'ubuntu';

main.style.display = "none";
create_menu.style.display = "none";
document.getElementById("entry_menu").style.display = "none";
help.style.display = "none";

function create_func(){
    if (entries == 0){
        entry_handler.style.display = "block";
        document.getElementById("entry_menu").style.display = "none";
    }
    home.style.display = "none";
    create_menu.style.display = "block";
    help.style.display = "none";
}

function home_func(){

    home.style.display = "block";
    create_menu.style.display = "none";
    help.style.display = "none";
    
}

function next(){
    document.getElementById("entries").innerHTML = "";
    entry_handler.style.display = "none";
    entries = entry_num.value;
    for(var i = 0; i < entries; i++){
        document.getElementById("entries").innerHTML = document.getElementById("entries").innerHTML + 'Entry '+ (i+1) +':    Label - <input type="text" class="entry" id="'+ i +'_label"> Value - <input type="number" class="entry" id="'+i+'"><br>';
        document.getElementById("entry_menu").style.display = "block";
    }
}

function back(){
    document.getElementById("entry_menu").style.display = "none";
    document.getElementById("entry_handler").style.display = "block";
}

function display_chart(data, data_label, chrt_type, dataset_name){
    var save_chrt = document.getElementById("save_chrt");
    var ctx = document.getElementById("canvas").getContext('2d');
    main_back = document.getElementById("main_back");
    main_back.addEventListener('click', main_back_func);
    console.log(save_chrt);
    save_chrt.addEventListener('click', function(e){
        var link = document.createElement('a');
        link.download = dataset_name + ".png";
        link.href = canvas.toDataURL();
        link.click();
        link.delete;
    })
    chart = new Chart(ctx, {
        // The type of chart we want to create
        type: chrt_type,
    
        // The data for our dataset
        data: {
            labels: data_label,
            datasets: [{
                label: dataset_name,
                backgroundColor: [
                    'rgba(255,99,132)',
                ],
                borderColor: 'rgb(255, 99, 132)',
                data: data
            }]
        },
    
        // Configuration options go here
        options: {}
    });
}

function create_chrt(){
    var chrt_type;
    if (chrt_type != document.getElementById("chrt_type").value){ 
        chrt_type = "";
        chrt_type = document.getElementById("chrt_type").value;
    }
    var ent = entry_num.value;
    var dataset_name = document.getElementById("dataset_name").value;
    var data = [ent];
    var data_label = [ent];
    if (dataset_name = null){
        dataset_name = "unnamed"
    }
    for(var i=0; i<entry_num.value; i++){
        var id_ = String(i);
        if (document.getElementById(id_).value == null){
            document.getElementById(id_).value = 0;
        }
        data[i] = document.getElementById(id_).value;
        if (document.getElementById(id_+"_label").value==null){
            console.log("noname")
            document.getElementById(id_+"_label").value="no_name";
        }
        data_label[i] = document.getElementById(id_ + "_label").value;
    }
    main.style.display = "block";
    home.style.display = "none";
    entry_handler.style.display = "none";
    document.getElementById("entry_menu").style.display = "none";
    console.log(dataset_name);
    display_chart(data, data_label, chrt_type, dataset_name);
}

function main_back_func(){
    chart = "";
    document.getElementById("main").innerHTML = '<canvas id="canvas"></canvas><br><div class="main_bttn" id="main_back">Back</div><div class="main_bttn" id="save_chrt">Save Chart</div>'
    main.style.display = "none";
    document.getElementById("entry_menu").style.display = "block";
}

create.addEventListener('click', create_func);

next_button.addEventListener('click', next)

home_button.addEventListener('click', home_func);

back_bttn.addEventListener('click', back);

create_button.addEventListener('click', create_chrt);

main_back.addEventListener('click', main_back_func);

help_button.addEventListener('click', function(){
    home.style.display = "none";
    create_menu.style.display = "none";
    help.style.display = "block";
})