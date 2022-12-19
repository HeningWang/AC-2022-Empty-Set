var randomized_maintrials = _.shuffle(maintrials)
//var randomized_maintrials = maintrials
console.log(randomized_maintrials);
//select list
if (list==0){
	var selected_list = Math.floor(Math.random() * 16)+1;
} else {
	var selected_list = list;
}	
console.log("list: "+ selected_list);
//use all trials
//var all_stims = randomized_maintrials
//select one list
var all_stims = randomized_maintrials.filter(trial=>(trial.list==selected_list||trial.list==17));	

var in_lab = false;
var on_web = true;


function split_ino_blocks (total_number_of_trials) {
	var average_block_length = total_number_of_trials/4;
	var shift = Math.floor(Math.random() * Math.floor(Math.round(average_block_length/4)));
	shift*=Math.sign(Math.random()-0.5);
	var end_of_first_block = average_block_length + shift;
	var end_of_second_block = end_of_first_block + average_block_length - shift;
	var end_of_third_block = end_of_second_block + average_block_length + shift;
	return [Math.floor(end_of_first_block),Math.floor(end_of_second_block),Math.floor(end_of_third_block)];
}

var total_number_of_trials = all_stims.length;
var block_boundaries = split_ino_blocks(total_number_of_trials);
//var block_boundaries = [1, 2, 3]

console.log("total length: "+all_stims.length);
console.log("block boundaries: "+ block_boundaries);



var stims_blocks = []
stims_blocks[1] = _.shuffle(all_stims.slice(0, block_boundaries[0]));
stims_blocks[2] = _.shuffle(all_stims.slice(block_boundaries[0], block_boundaries[1]));
stims_blocks[3] = _.shuffle(all_stims.slice(block_boundaries[1],block_boundaries[2]));
stims_blocks[4] = _.shuffle(all_stims.slice(block_boundaries[2],total_number_of_trials));

stims_blocks = _.shuffle(stims_blocks)

var stims_block1 = stims_blocks[0];
console.log(stims_block1);
var stims_block2 = stims_blocks[1];
console.log(stims_block2);
var stims_block3 = stims_blocks[2];
console.log(stims_block3);
var stims_block4 = stims_blocks[3];
console.log(stims_block4);


//trainingtrials = [];

randomized_trainingtrials = _.shuffle(trainingtrials);
//console.log(randomized_trainingtrials);

// character codes
//var CHAR = 75; // key k
//var CHAR_L = 74; // key j
//var CHAR_R = 76; // key l
var CHAR = 32; // space bar
//var CHAR_L = 83; // key s
//var CHAR_R = 76; // key l
//var CHAR_L = 70; // key f
//var CHAR_R = 74; // key j
var CHAR_L = 51; // key 3
var CHAR_R = 48; // key 0

function slide_builder(name, stims, feedback) {

	return slide({
		"name": name,

		present: stims,

		present_handle: function(stim) {

			this.stim = stim;
			
		    $(document).unbind('keydown');
			$(document).unbind('keyup');

		    function clearAll() {
				$(".err").html("");
			    $(".err").hide();
			    $(".right_response").hide();
			    $(".left_response").hide();
			    $(".display_condition").hide();
			    $(".image_display").hide();
		    }

		    clearAll();
			
			var picture_timer = undefined;
			
		    //TODO: make this an argument
		    //CHAR = 40; // down arrow
		    //press_and_hold(CHAR, display_one);
			var inter_trial_interval = 400;
			setTimeout(function(){	
				display_zero(Date.now(),-1);
			}, inter_trial_interval);

		    function press_and_hold(char_code, fn_to_call) {
			    $(document).unbind('keydown');
			    clearAll();
			    $(document).keydown(function(event) {
				    if(event.which == char_code) {
					    press_time = Date.now()
					    fn_to_call(press_time);
				    }
			    });
		    }
			
			function mask (segment) {
				var split_segment = segment.split('');
				var masked = '';
				for (i = 0; i < split_segment.length; i++) {
					if (split_segment[i]==" ") {
						masked += " ";
					//} else if (split_segment[i]==".") {
					//	masked += ".";
					//} else if (split_segment[i]==",") {
					//	masked += ",";
					} else if (split_segment[i]=="+") {
						masked += "<br><br>";
					} else {
						masked += "-";
					}
				}
				return masked;
			}
			
			function display_zero(init_time,step) {
				clearAll();
				$(document).unbind('keydown');
			    $(document).unbind('keyup');
				
			    
				//TODO: clean up
				// get image here, to load it; but don't display it until display_two
				_s.image_error = false;
				//var fname = "../pictures/" + stim.picture
				var fname = "../pictures/" + "pic" + stim.item + "_" + stim.condition + ".svg"//".png"
				//console.log(fname)
				var alt_text = "Image cannot be displayed."
				if (on_web) {
					alt_text += " Please check your internet connection."
				}
			    $(".image_display").html("<img src='"+fname+"' width='30%' alt='"+alt_text+"' onerror='_s.image_error = true;'/>");
				
				
				
                setTimeout(function(){	
				    //$(".image_display").show();
					setTimeout(function(){	
				        //$(".image_display").hide();
			            display_one(Date.now(),-1);
			        }, 150);
			    }, 150);
				
			}

		    function display_one(init_time,step) {
				
				clearAll();
				$(document).unbind('keydown');
			    $(document).unbind('keyup');
				
				if (step == -1){ 
					_s.split = stim.sentence.split("*");
					_s.read_time = [];
					_s.masks = [];
					_s.timeout = 0;
					 
					for (simulated_step = -1; simulated_step < _s.split.length; simulated_step++){
						//TODO: add full stop
						var current_split = [];
						for (j = 0; j < _s.split.length; j++) {
							if (j!=simulated_step) {
								current_split[j] = mask(_s.split[j]);
							} else {
								var str = _s.split[j];
								current_split[j] = str.replace(/\+/g, "<br><br>");
							}
						}
						_s.masks.push(current_split.join(' ')); 	
					}
				//console.log(_s.masks)	
				}
				var joined = "<samp style=\"font-size:20;\">"+_s.masks[step+1]+"</samp>";
				$(".display_condition").html(joined);
				$(".display_condition").show();
			    // record the initial time
			    // init_time = Date.now();
				
				// listen for a space bar
			    $(document).keydown(function(event) {
				    if(event.which == CHAR) {
						$(document).unbind('keydown');
					    var rt = Date.now() - init_time; // in milliseconds
						_s.read_time.push(rt);
						//press_and_hold(CHAR, display_two);
						clearAll();
						var inter_stimulus_interval = 0;
						//TODO: move timeout into else-body
						setTimeout(function(){
							if (step < _s.split.length-1) {
								step++;
								display_one(Date.now(),step);
							//} else if (stim.question) {
							} else {	
								setTimeout(function(){
									display_two(Date.now());
								}, 600);
							} 	
						}, inter_stimulus_interval);	
				    } else {
					    $(".err").html("Press space bar to advance.");
					    $(".err").show();
				    }
			    });
				
		    }

		    function display_two(init_time) {
				
				clearAll();
				$(document).unbind('keydown');
			    $(document).unbind('keyup');
				
				//pic and question (if needed):
				$(".image_display").show();
				//$(".display_condition").show();
				//$(".display_condition").html("<samp style=\"font-size:20;\">"+stim.question+"</samp>");
				
				left_text = exp.condition == "3" ? "passt" : "passt nicht";
				right_text = exp.condition == "3" ? "passt nicht" : "passt";
				$(".left_response").html("<b>3 für \"" + left_text + "\"</b>");
				$(".left_response").show();
				$(".right_response").html("<b>0 für \"" + right_text + "\"</b>");
				$(".right_response").show();

				
				picture_timer = setTimeout(function(){
					$(".err").html("<b><big>Bitte versuch spontaner zu urteilen!</big></b>");
					$(".err").show();
					setTimeout(function(){
						_s.timeout = 1;
						clearAll();	
						_s.log_responses();
					}, 2000);
				}, 9000);
				
				true_code = exp.condition == "3" ? CHAR_L : CHAR_R;
				
			    $(document).keydown(function(event) {
				    if(event.which == CHAR_L || event.which == CHAR_R ) { // left = ..., right = ...
						_s.pictureRT = Date.now() - init_time; // in milliseconds
						_s.response = event.which == true_code;
						clearTimeout(picture_timer);
						if(feedback){
							if(_s.response==stim.correct_response) {							  
								$(".err").html("<font color=\"green\"><b><big>richtig!</big></b></font>");
							} else {
								$(".err").html("<font color=\"red\"><b><big>falsch!</big></b></font>");
							}							
							$(".err").show();
							setTimeout(function(){
								clearAll();	
								_s.log_responses();
							}, 1000);
						} else {
							clearAll();	
							_s.log_responses();
						}
					    _s.pictureRT = undefined; // unset
						_s.response = undefined; // unset
					   
				    }
			    });
				
		    }
		},

		log_responses : function() {
			exp.data_trials.push({
				"item": this.stim.item,
				"condition": this.stim.condition,
				"empty_set_quantifier": this.stim.empty_set_quantifier,
				"sentence": this.stim.sentence,
				"model": this.stim.model,
				"position_ausser": this.stim.position_ausser,
				"marked_object": this.marked_object,
				"pictureRT": this.pictureRT,
				"response": this.response,
				"correct_response": this.stim.correct_response,
				"image_error": this.image_error,
				"time out": this.timeout,
				"read_time": this.read_time,
				"list": this.list
			});
			// TODO: make sure we still have more trials, else call exp.go()
			if(_s.present.length > 0) {
				_stream.apply(this)
			} else{
				//end of block
				console.log("End of block")
				//$(document).unbind('keydown');
				exp.go();
			}
		}

	})
};

function make_slides(f) {
	var   slides = {};

	slides.i0 = slide({
		name : "i0",
		start: function() {
			exp.startT = Date.now();
		}
	});
	
	slides.consent =  slide({
		name : "consent",
		start : function(){},
		present : ['dummy'],
		present_handle : function() {
			$(".err").hide();
			$(document).unbind('keydown');
			$(document).unbind('keyup');
			$(document).keydown(function(event) {
				if(event.which == CHAR) {
				$(".err").html("<b>Drücken Sie &quot;weiter&quot;, um fortzufahren!</b>");
				$(".err").show();
				}
			});
		},
		submit : function(e){
		  //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
		  //TODO: MAKE CERTAIN ONES REQUIRED
			$(".err").hide();
			if($("input:checkbox[name=checkbox]:checked").length < $("input:checkbox[name=checkbox]").length) {
				$(".err").html("<b>Das Experiment kann erst begonnen werden, wenn alle obigen Punkte angekreuzt wurden.</b>");
				$(".err").show();
			} else {
				exp.go(); //use exp.go() if and only if there is no "present" data.
			}
	    }
	});
	
	slides.debriefing_info =  slide({
		name : "debriefing_info",
		start : function(){},
		present : ['dummy'],
		present_handle : function() {
			$(document).unbind('keydown');
			$(document).unbind('keyup');
			$(document).keydown(function(event) {
				if(event.which == CHAR) {
					exp.go();
				}
			});
		},
	});

	slides.instructions0 = slide({
		name : "instructions0",
		present : ['dummy'],
		present_handle : function() {
			$(document).unbind('keydown');
			$(document).unbind('keyup');
			$("#true_button0").html(exp.condition);
			$("#false_button0").html(exp.condition == "3" ? "0" : "3");
			$(document).keydown(function(event) {
				if(event.which == CHAR) {
					exp.go();
				}
			});
		}
	/*
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
    */
	});

	slides.instructions1 = slide({
		name : "instructions1",
		present : ['dummy'],
		present_handle : function() {
			$(document).unbind('keydown');
			$(document).unbind('keyup');
			$("#true_button1").html(exp.condition);
			$("#false_button1").html(exp.condition == "3" ? "0" : "3");
			$(document).keydown(function(event) {
				if(event.which == CHAR) {
					exp.go();
				}
			});
		}
	/*
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
    */
	});
	
	slides.instructions2 = slide({
		name : "instructions2",
		present : ['dummy'],
		present_handle : function() {
			$(document).unbind('keydown');
			$(document).unbind('keyup');
			$("#true_button2").html(exp.condition);
			$("#false_button2").html(exp.condition == "3" ? "0" : "3");
			$(document).keydown(function(event) {
				if(event.which == CHAR) {
					exp.go();
				}
			});
		}
	/*
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
    */
	});

    slides.instructions3 = slide({
		name : "instructions3",
		present : ['dummy'],
		present_handle : function() {
			$(document).unbind('keydown');
			$(document).unbind('keyup');
			$("#true_button3").html(exp.condition);
			$("#false_button3").html(exp.condition == "3" ? "0" : "3");
			$(document).keydown(function(event) {
				if(event.which == CHAR) {
					exp.go();
				}
			});
		}
	/*
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
    */
	});

    slides.instructions4 = slide({
		name : "instructions4",
		present : ['dummy'],
		present_handle : function() {
			$(document).unbind('keydown');
			$(document).unbind('keyup');
			$("#true_button4").html(exp.condition);
			$("#false_button4").html(exp.condition == "3" ? "0" : "3");
			$(document).keydown(function(event) {
				if(event.which == CHAR) {
					exp.go();
				}
			});
		}
	/*
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
    */
	});	
	
	
  

	slides.training = slide_builder("training", randomized_trainingtrials,
		true);
  


	slides.begin_slide = slide({
		name : "begin_slide",
		present : ['dummy'],
		present_handle : function() {
			$(document).unbind('keydown');
			$(document).unbind('keyup');
			$(document).keydown(function(event) {
				if(event.which == CHAR) {
					exp.go();
				}
			});
		}
	  /*
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
    */
	});

  
	slides.single_trial_first_block = slide_builder("single_trial_first_block", stims_block1, false);
	slides.single_trial_second_block = slide_builder("single_trial_second_block", stims_block2, false);
	slides.single_trial_third_block = slide_builder("single_trial_third_block", stims_block3, false);
	slides.single_trial_fourth_block = slide_builder("single_trial_fourth_block", stims_block4, false);


	slides.begin_break_one = slide({
		name : "begin_break_one",
		present : ['dummy'],
		present_handle : function() {
			$(document).unbind('keydown');
			$(document).unbind('keyup');
			$(document).keydown(function(event) {
				if(event.which == 66) {
					exp.go();
				} else {
					exp.break_one_missed=true;
				}
			});
		}
	  /*
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
    */
	});

	slides.end_break_one = slide({
		name : "end_break_one",
		present : ['dummy'],
		present_handle : function() {
			$(document).unbind('keydown');
			$(document).unbind('keyup');
			$(document).keydown(function(event) {
				if(event.which == 66) {
					exp.go();
				}
			});
		}
	  /*
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
    */
	});

	slides.begin_break_two = slide({
		name : "begin_break_two",
		present : ['dummy'],
		present_handle : function() {
			$(document).unbind('keydown');
			$(document).unbind('keyup');
			$(document).keydown(function(event) {
				if(event.which == 66) {
					exp.go();
				} else {
					exp.break_two_missed=true;
				}
			});
		}
	  /*
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
    */
	});

	slides.end_break_two = slide({
		name : "end_break_two",
		present : ['dummy'],
		present_handle : function() {
			$(document).unbind('keydown');
			$(document).unbind('keyup');
			$(document).keydown(function(event) {
				if(event.which == 66) {
					exp.go();
				}
			});
		}
	  /*
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
    */
	});
  
	slides.begin_break_three = slide({
		name : "begin_break_three",
		present : ['dummy'],
		present_handle : function() {
			$(document).unbind('keydown');
			$(document).unbind('keyup');
			$(document).keydown(function(event) {
				if(event.which == 66) {
					exp.go();
				} else {
					exp.break_three_missed=true;
				}		
			});
		}
	  /*
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
    */
	});

	slides.end_break_three = slide({
		name : "end_break_three",
		present : ['dummy'],
		present_handle : function() {
			$(document).unbind('keydown');
			$(document).unbind('keyup');
			$(document).keydown(function(event) {
				if(event.which == 66) {
					exp.go();
				}
			});
		}
	/*
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
    */
	});



	slides.subj_info =  slide({
		name : "subj_info",
		start : function(){},
		present : ['dummy'],
		present_handle : function() {
			$(document).unbind('keydown');
			$(document).unbind('keyup');
			$(document).keydown(function(event) {
				if(event.which == CHAR) {
				$(".err").html("<b>Use &quot;Submit&quot; button to advance!</b>");
				$(".err").show();
				}
			});
		},
		submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
	  //TODO: MAKE CERTAIN ONES REQUIRED
		$(".err").hide();
		if($("#language").val() == "" || $("#prolific_id").val() == "") {
			//if($("#language").val() == "") {
			//if($("#age").val() == "" || $("#gender").val() == "" || $("#language").val() == "") {
			//if($("#age").val() == "" || $("#gender").val() == "" || $("#language").val() == "" || $("#education").val() == -1) {
			$(".err").html("<b>Please provide required information.</b>");
			$(".err").show();
		} else {
			exp.subj_data = {
				language : $("#language").val(),
				//enjoyment : $("#enjoyment").val(),
				asses : $('input[name="assess"]:checked').val(),
				age : $("#age").val(),
				gender : $("#gender").val(),
				//education : $("#education").val(),
				comments : $("#comments").val(),
				// problems: $("#problems").val(),
				//fairprice: $("#fairprice").val(),
				fluent: $('input[name="fluent"]:checked').val(),
				prolific_id: $("#prolific_id").val(),
			};
			exp.go(); //use exp.go() if and only if there is no "present" data.
		}
		}
	});

	slides.thanks = slide({
		name : "thanks",
		start : function() {
			exp.data= {
				"trials" : exp.data_trials,
				"id" : exp.id,
				"catch_trials" : exp.catch_trials,
				"block_boundaries" : block_boundaries,
				"system" : exp.system,
				"condition" : exp.condition,
				"subject_information" : exp.subj_data,
				"time_in_minutes" : (Date.now() - exp.startT)/60000,
				"missed_break_one" : exp.break_one_missed,
				"missed_break_two" : exp.break_two_missed,
				"missed_break_three" : exp.break_three_missed
			};
			$(".complete").hide();
			$(".click_complete").hide();
			$(".debriefing").hide();
			$(".err").html("<b>Please wait!</b>");
			$(".err").show();
			save_data(exp.data);
		},
		present : ['dummy'],
		present_handle : function() {
			$(document).unbind('keydown');
			$(document).unbind('keyup');
		},
	});
  
	return slides;
}

function save_data (data) {
	//save data...
	//...on the web
	if (on_web) {	
		postAjax('https://www.lingexp.uni-tuebingen.de/b1/kammertenberg/save_data.php',
					{ json: JSON.stringify(data)},
					show_completion_link
		);	
		console.log("posted");
	}	
	//...in the lab
	if (in_lab) {	
		var save_in_lab = (function () {
			var a = document.createElement("a");
			document.body.appendChild(a);
			a.style = "display: none";
			return function (data, fileName) {
				var json = JSON.stringify(data),
				blob = new Blob([json], {type: "octet/stream"}),
				url = window.URL.createObjectURL(blob);
				a.href = url;
				a.download = fileName;
				a.click();
				window.URL.revokeObjectURL(url);
			};
		}());
		var id = uniqid("mauna_kea_");
		file_name = "results_"+id+".json";
		save_in_lab(data, file_name);	
		show_done();
		//Todo: PSI only
		show_completion_link();
	}
}

function show_completion_link () {
	setTimeout(function(){
				show_done();
				$(".click_complete").show();
				var completion_code;
				get_completion_link("https://www.lingexp.uni-tuebingen.de/b1/kammertenberg/completion_link.php", function(data){
					completion_code = data;
					$(".complete").attr("href", "https://app.prolific.co/submissions/complete?cc=" + data)
					$(".complete").html("Completion code: " + data);
					//PSI only
					//$(".complete").attr("href", "mailto:experimente-b8@sfb833.uni-tuebingen.de?subject=Teilnahme%20" + exp.id);
					//$(".complete").html("Teilnahme-Code: " + exp.id);
					$(".complete").show();
					//$(".debriefing").html("Code für <a href=\"Debriefing_Public_encrypted.pdf\" target =\"_blank\">Debriefing-Dokument</a>: " + data);
					//$(".debriefing").show();
					console.log("got"+data);
					console.log(data);
				});				
	},500)
}

function show_done () {
		$(".err").html("<b>Das Experiment ist zuende!</b>");
		$(".err").show();
}

function uniqid(a = "",b = false){
    var c = Date.now()/1000;
    var d = c.toString(16).split(".").join("");
    while(d.length < 14){
        d += "0";
    }
    var e = "";
    if(b){
        e = ".";
        var f = Math.round(Math.random()*100000000);
        e += f;
    }
    return a + d + e;
}

function postAjax(url, data, success) {
	var params = typeof data == 'string' ? data : Object.keys(data).map(
		function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
	).join('&');
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	//var xhr = new XMLHttpRequest();
	xhr.open('POST', url);
	xhr.onreadystatechange = function() {
		if (xhr.readyState>3 && xhr.status==200) { success(); } 
	};
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(params);
	return xhr;
}

function get_completion_link(url, success) {
	var xhr1 = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	//var xhr = new XMLHttpRequest();
	xhr1.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) { console.log("success"); success(this.responseText); } 
	};
	xhr1.open('GET', url);
	xhr1.send();
	return xhr1;
}
	
/// init ///
function init() {
	exp.trials = [];
	exp.catch_trials = [];
	exp.id = uniqid();
	// TODO: condition for Y/N response key?
	exp.condition = _.sample(["3", "0"]); //can randomize between subject conditions here
	exp.block_boundaries = block_boundaries; 
	exp.break_one_missed = false;
	exp.break_two_missed = false;
	exp.break_three_missed = false;
	exp.system = {
		Browser : BrowserDetect.browser,
		OS : BrowserDetect.OS,
		screenH: screen.height,
		screenUH: exp.height,
		screenW: screen.width,
		screenUW: exp.width
    };
	//blocks of the experiment:
    //TODO: Find better ways of blocking?
	//exp.structure=["i0", "consent", "debriefing_info", "instructions0", "instructions1", "instructions2", "instructions3", "instructions4",  "training",  "begin_slide", "single_trial_first_block", "begin_break_one", "end_break_one", "single_trial_second_block", "begin_break_two", "end_break_two", "single_trial_third_block", "begin_break_three", "end_break_three", "single_trial_fourth_block", 'subj_info', 'thanks'];
	//exp.structure=["i0", "consent", "debriefing_info", "instructions0", "instructions1", "instructions2", "instructions3", "instructions4", "training",  "begin_slide", "single_trial_first_block", "begin_break_one", "end_break_one", "single_trial_second_block", "begin_break_two", "end_break_two", "single_trial_third_block", "begin_break_three", "end_break_three", "single_trial_fourth_block", 'subj_info', 'thanks'];
	exp.structure=["i0", "consent", "debriefing_info", "instructions0", "instructions1", "instructions2", "instructions3", "instructions4", "training", "begin_slide", "single_trial_first_block", "begin_break_one", "end_break_one", "single_trial_second_block", "begin_break_two", "end_break_two", "single_trial_third_block", "begin_break_three", "end_break_three", "single_trial_fourth_block", 'subj_info', 'thanks'];
	
	
	exp.data_trials = [];
	//make corresponding slides:
	exp.slides = make_slides(exp);

	exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

	$('.slide').hide(); //hide everything
	
	var elem = document.documentElement;

	//make sure turkers have accepted HIT (or you're not in mturk)
	  //TODO: replace Start button with space bar?
	$("#start_button").click(function() {
		if (turk.previewMode) {
			$("#mustaccept").show();
		} else {
			$("#start_button").click(function() {$("#mustaccept").show();});
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.mozRequestFullScreen) { /* Firefox */
				elem.mozRequestFullScreen();
			} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
				elem.webkitRequestFullscreen();
			} else if (elem.msRequestFullscreen) { /* IE/Edge */
				elem.msRequestFullscreen();
			}
			exp.go();
		}
	});

	exp.go(); //show first slide
	  // TODO: advance instructions with space bar, not clicking
	  // TODO: error messages when listening to keys [including proper display]
}