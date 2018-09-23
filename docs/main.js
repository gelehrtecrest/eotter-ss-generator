(function($){
	//画像関連
	var img;
	var img2;
	var img_text_1;
	var img_text_2;
	var img_text_3;
	var stage;

	//画像ロード
	function loadImage (imageData, logoImageData){
		//画像のロード
		//ローカル
		if($('input[name=logo]:checked').val() === 'local'){
			if(logoImageData !== null) {
				var baseImg = new Image();
				var canvas = document.getElementById('canvas');
				baseImg.src = canvas.toDataURL();
				img = new createjs.Bitmap(baseImg);
			} else {
				img = null;
			}
		} else { // URL
			var baseImg = new Image();
			baseImg.src = $('#logourl').val()
			img = new createjs.Bitmap(baseImg);
		}

		//画像が選択されている時のみ合成
		if(imageData !== null) {
			var baseImg2 = new Image();
			baseImg2.src = imageData;
			img2 = new createjs.Bitmap(baseImg2);
			$('#result').attr({
				'width': baseImg2.width,
				'height': baseImg2.height
			});
		}

		stage = new createjs.Stage('result');
	}

	//ロゴを合成する処理
	function genImage (imageIni, imageIni_1, imageIni_2, imageIni_3){
		//合成画像の設定
		//回転
		img.rotation = imageIni.rotation;
		//回転の中心は、画像の中央
		img.regX = img.getBounds().width / 2;
		img.regY = img.getBounds().height / 2;

		//上下は10ピクセルごと移動
		// 中央点からの補正
		//拡縮は10％ずつと過程 = いずれ定数化する必要がある
		img.x = imageIni.xPos * 10 + img.getBounds().width / 2 * (1 + imageIni.Scale / 10);
		img.y = imageIni.yPos * 10 + img.getBounds().height / 2 * (1 + imageIni.Scale / 10);

		//拡縮は10％ずつ
		img.scaleX = img.scaleX * (1 + imageIni.Scale / 10);
		img.scaleY = img.scaleY * (1 + imageIni.Scale / 10);

		//透明化
		img.alpha = imageIni.alpha;	

		// 文字1合成
		var content = $('#text_1').val();
		img_text_1 = new createjs.Text(content);
		img_text_1.color = $('#color_1').val();
		img_text_1.font = $('#style_1').val() + ' ' + $('#px_1').val() + $('#font_1').val();

		//合成画像の設定
		//上下は10ピクセルごと移動
		img_text_1.x = imageIni_1.xPos * 10;
		img_text_1.y = imageIni_1.yPos * 10;
		//拡縮は10％ずつ
		img_text_1.scaleX = img_text_1.scaleX * (1 + imageIni_1.Scale / 10);
		img_text_1.scaleY = img_text_1.scaleY * (1 + imageIni_1.Scale / 10);

		// 文字2合成
		var content = $('#text_2').val();
		img_text_2 = new createjs.Text(content);
		img_text_2.color = $('#color_2').val();
		img_text_2.font = $('#style_2').val() + ' ' + $('#px_2').val() + $('#font_2').val();

		//合成画像の設定
		//上下は10ピクセルごと移動
		img_text_2.x = imageIni_2.xPos * 10;
		img_text_2.y = imageIni_2.yPos * 10;
		//拡縮は10％ずつ
		img_text_2.scaleX = img_text_2.scaleX * (1 + imageIni_2.Scale / 10);
		img_text_2.scaleY = img_text_2.scaleY * (1 + imageIni_2.Scale / 10);

		// 文字3合成
		var content = $('#text_3').val();
		img_text_3 = new createjs.Text(content);
		img_text_3.color = $('#color_3').val();
		img_text_3.font = $('#style_3').val() + ' ' + $('#px_3').val() + $('#font_3').val();

		//合成画像の設定
		//上下は10ピクセルごと移動
		img_text_3.x = imageIni_3.xPos * 10;
		img_text_3.y = imageIni_3.yPos * 10;
		//拡縮は10％ずつ
		img_text_3.scaleX = img_text_3.scaleX * (1 + imageIni_3.Scale / 10);
		img_text_3.scaleY = img_text_3.scaleY * (1 + imageIni_3.Scale / 10);

		//ステージ生成
		stage.addChild(img2);
		stage.addChild(img);
		stage.addChild(img_text_1);
		stage.addChild(img_text_2);
		stage.addChild(img_text_3);

		//ステージ反映
		stage.update();
	}

	$(function(){
		//設定のデフォルト値
		$('#logourl').val('https://pbs.twimg.com/media/DniRZQtUwAAqUXZ.png');
		loadlogocanvas('https://pbs.twimg.com/media/DniRZQtUwAAqUXZ.png', false);
	
		//ロゴURL変更時の処理
		$(document).on('input', '#logourl', function() {
			$.ajax({
				url: $('#logourl').val()
			}).done(function(data){
				var baseImg = new Image();
				baseImg.src = $('#logourl').val();
				img = new createjs.Bitmap(baseImg);
				$('#alert').text('');
				//URL再生成
				write_settingurl(imageIni, imageIni_1, imageIni_2, imageIni_3);
				loadlogocanvas($('#logourl').val(), false);
			}).fail(function(data){
				$('#alert').text('ロゴのURLが間違っています。ヒント：httpsから始まるURLにしてください。');
			});
		});

		//読込画像のオブジェクト
		var imageIni = {
			xPos : 2,
			yPos : 2,
			Scale : -1,
			rotation : 0,
			alpha : 1.0,
			imageData : null,
			logoImageData : null,
			resetImage : function(){
				this.xPos = 2;
				this.yPos = 2;
				this.Scale = -1;
				this.rotation = 0;
			},
			makeImage : function(imageIni, imageIni_1, imageIni_2, imageIni_3){
				if(this.imageData !== null) {
					loadImage(this.imageData, this.logoImageData);
					genImage(imageIni, imageIni_1, imageIni_2, imageIni_3);
				}
			}
		};

		//設定のデフォルト値
		$('#text_1').val('タイトルです @光の戦士');
		$('#color_1').val('white');
		$('#style_1').val('');
		$('#font_1').val('/1.5 Meiryo,sans-serif');
		$('#px_1').val('40px');

		//読込画像のオブジェクト
		var imageIni_1 = {
			xPos : 8,
			yPos : 8,
			Scale : 8,
			imageData : null,
			logoImageData : null,
			resetImage : function(){
				this.xPos = 8;
				this.yPos = 8;
				this.Scale = 8;
			},
			makeImage : function(imageIni, imageIni_1, imageIni_2, imageIni_3){
				if(this.imageData !== null) {
					loadImage(this.imageData, this.logoImageData);
					genImage(imageIni, imageIni_1, imageIni_2, imageIni_3);
				}
			}
		};

		//設定のデフォルト値
		$('#text_2').val('テキスト１行目です');
		$('#color_2').val('white');
		$('#style_2').val('');
		$('#font_2').val('/1.5 Meiryo,sans-serif');
		$('#px_2').val('32px');

		//読込画像のオブジェクト
		var imageIni_2 = {
			xPos : 8,
			yPos : 20,
			Scale : 8,
			imageData : null,
			logoImageData : null,
			resetImage : function(){
				this.xPos = 8;
				this.yPos = 20;
				this.Scale = 8;
			},
			makeImage : function(imageIni, imageIni_1, imageIni_2, imageIni_3){
				if(this.imageData !== null) {
					loadImage(this.imageData, this.logoImageData);
					genImage(imageIni, imageIni_1, imageIni_2, imageIni_3);
				}
			}
		};

		//設定のデフォルト値
		$('#text_3').val('テキスト２行目です');
		$('#color_3').val('white');
		$('#style_3').val('');
		$('#font_3').val('/1.5 Meiryo,sans-serif');
		$('#px_3').val('32px');

		//読込画像のオブジェクト
		var imageIni_3 = {
			xPos : 8,
			yPos : 28,
			Scale : 8,
			imageData : null,
			logoImageData : null,
			resetImage : function(){
				this.xPos = 8;
				this.yPos = 28;
				this.Scale = 8;
			},
			makeImage : function(imageIni, imageIni_1, imageIni_2, imageIni_3){
				if(this.imageData !== null) {
					loadImage(this.imageData, this.logoImageData);
					genImage(imageIni, imageIni_1, imageIni_2, imageIni_3);
				}
			}
		};


		//get情報
		var url = location.href;
		var parameters = url.split('?');
		var queries = (parameters[1] || 'dummy=dummy').split('&');
		i = 0;

		for(i; i < queries.length; i ++) {
			var t = queries[i].split('=');
			if(t['0'] == 'logourl'){
				$('#logourl').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'xpos'){
				imageIni.xPos = parseFloat(t['1']);
			} else if(t['0'] == 'ypos'){
				imageIni.yPos = parseFloat(t['1']);
			} else if(t['0'] == 'scale'){
				imageIni.Scale = parseFloat(t['1']);
			} else if(t['0'] == 'rotation'){
				imageIni.rotation = parseFloat(t['1']);
			} else if(t['0'] == 'alpha'){
				imageIni.alpha = parseFloat(t['1']);
			} else if(t['0'] == 'logo'){
				if(t['1'] == 'local'){
					$('input[name=logo]').val(['local']);
				}
			} else if(t['0'] == 'xpos_1'){
				imageIni_1.xPos = parseFloat(t['1']);
			} else if(t['0'] == 'ypos_1'){
				imageIni_1.yPos = parseFloat(t['1']);
			} else if(t['0'] == 'scale_1'){
				imageIni_1.Scale = parseFloat(t['1']);
			} else if(t['0'] == 'text_1'){
				$('#text_1').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'color_1'){
				$('#color_1').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'style_1'){
				$('#style_1').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'font_1'){
				$('#font_1').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'px_1'){
				$('#px_1').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'xpos_2'){
				imageIni_2.xPos = parseFloat(t['1']);
			} else if(t['0'] == 'ypos_2'){
				imageIni_2.yPos = parseFloat(t['1']);
			} else if(t['0'] == 'scale_2'){
				imageIni_2.Scale = parseFloat(t['1']);
			} else if(t['0'] == 'text_2'){
				$('#text_2').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'color_2'){
				$('#color_2').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'style_2'){
				$('#style_2').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'font_2'){
				$('#font_2').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'px_2'){
				$('#px_2').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'xpos_3'){
				imageIni_3.xPos = parseFloat(t['1']);
			} else if(t['0'] == 'ypos_3'){
				imageIni_3.yPos = parseFloat(t['1']);
			} else if(t['0'] == 'scale_3'){
				imageIni_3.Scale = parseFloat(t['1']);
			} else if(t['0'] == 'text_3'){
				$('#text_3').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'color_3'){
				$('#color_3').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'style_3'){
				$('#style_3').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'font_3'){
				$('#font_3').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'px_3'){
				$('#px_3').val(decodeURIComponent(t['1']));
			} else if(t['0'] == 'title'){
				$('title').text(decodeURIComponent(t['1']));
				$('h1').text(decodeURIComponent(t['1']));
			} else if(t['0'] == 'comment'){
				$('#comment').text(decodeURIComponent(t['1']));
			}
		}

		//イベント関連処理
		//画像読込
		$('#getfile').change(function (){
			//読み込み
			var fileList =$('#getfile').prop('files');
			var reader = new FileReader();
			reader.readAsDataURL(fileList[0]);

			//読み込み後
			$(reader).on('load',function(){
				$('#preview').prop('src',reader.result);
				imageIni.imageData = reader.result;
			});
		});

		//ロゴ画像読込
		$('#logogetfile').change(function (){
			//読み込み
			var fileList =$('#logogetfile').prop('files');
			var reader = new FileReader();
			reader.readAsDataURL(fileList[0]);
			//読み込み後
			$(reader).on('load',function(){
				imageIni.logoImageData = reader.result;
				loadlogocanvas(reader.result, false);
			});
		});

		//ロゴ画像読込(白抜き)
		$('#logogetfilealpha').change(function (){
			//読み込み
			var fileList =$('#logogetfilealpha').prop('files');
			var reader = new FileReader();
			reader.readAsDataURL(fileList[0]);
			//読み込み後
			$(reader).on('load',function(){
				imageIni.logoImageData = reader.result;
				loadlogocanvas(reader.result, true);
			});
		});

		function loadlogocanvas(url, flag){
			var image = new Image();
			image.onload = function() {
				$('#canvas').attr({
					'width': image.width,
					'height': image.height
				});
				var canvas = document.getElementById('canvas');
				var context = canvas.getContext('2d');
 				context.drawImage(image, 0, 0);
				var imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
				var data = imageData.data;
				for (var i = 0; i < data.length; i += 4) {
					//各カラーチャンネルで、一番暗い値を取得
					var minLuminance = 255;
					if(data[i] < minLuminance)
						minLuminance = data[i];
					if(data[i + 1] < minLuminance)
						minLuminance = data[i + 1];
					if(data[i + 2] < minLuminance)
						minLuminance = data[i + 2];

					if(flag){
						//一番暗い値を、アルファチャンネルに反映(明るいところほど透明に)
						data[i + 3] = 255 - minLuminance;
					}
				}
				context.putImageData(imageData, 0, 0);
			};
			image.src = url;
		}

		//ボタンイベントまとめ
		$('.btn').on('click',function(e){
			if (e.target.id === 'update'){
			}else if (e.target.id === 'up'){
				imageIni.yPos -= 1;
			}else if (e.target.id === 'down'){
				imageIni.yPos += 1;
			}else if (e.target.id === 'left'){
				imageIni.xPos -= 1;
			}else if (e.target.id === 'right') {
				imageIni.xPos += 1;
			}else if (e.target.id === 'zoomin') {
				imageIni.Scale += 1;
			}else if (e.target.id === 'zoomout') {
				imageIni.Scale -= 1;
			}else if (e.target.id === 'rotation_r') {
				imageIni.rotation += 7.5;
			}else if (e.target.id === 'rotation_l') {
				imageIni.rotation -= 7.5;
			}else if (e.target.id === 'alpha_up') {
				imageIni.alpha += 0.1;
				if(imageIni.alpha >= 0.9){
					imageIni.alpha = 1.0;
					$('#alpha_up').prop("disabled", true);
				}
				$('#alpha_down').prop("disabled", false);
			}else if (e.target.id === 'alpha_down') {
				imageIni.alpha -= 0.1;
				if(imageIni.alpha <= 0.1){
					imageIni.alpha = 0.0;
					$('#alpha_down').prop("disabled", true);
				}
				$('#alpha_up').prop("disabled", false);
			}else if (e.target.id === 'reset'){
				imageIni.resetImage();
			}else if (e.target.id === 'up_1'){
				imageIni_1.yPos -= 1;
			}else if (e.target.id === 'down_1'){
				imageIni_1.yPos += 1;
			}else if (e.target.id === 'left_1'){
				imageIni_1.xPos -= 1;
			}else if (e.target.id === 'right_1') {
				imageIni_1.xPos += 1;
			}else if (e.target.id === 'zoomin_1') {
				imageIni_1.Scale += 1;
			}else if (e.target.id === 'zoomout_1') {
				imageIni_1.Scale -= 1;
			}else if (e.target.id === 'reset_1'){
				imageIni_1.resetImage();
			}else if (e.target.id === 'up_2'){
				imageIni_2.yPos -= 1;
			}else if (e.target.id === 'down_2'){
				imageIni_2.yPos += 1;
			}else if (e.target.id === 'left_2'){
				imageIni_2.xPos -= 1;
			}else if (e.target.id === 'right_2') {
				imageIni_2.xPos += 1;
			}else if (e.target.id === 'zoomin_2') {
				imageIni_2.Scale += 1;
			}else if (e.target.id === 'zoomout_2') {
				imageIni_2.Scale -= 1;
			}else if (e.target.id === 'reset_2'){
				imageIni_2.resetImage();
			}else if (e.target.id === 'up_3'){
				imageIni_3.yPos -= 1;
			}else if (e.target.id === 'down_3'){
				imageIni_3.yPos += 1;
			}else if (e.target.id === 'left_3'){
				imageIni_3.xPos -= 1;
			}else if (e.target.id === 'right_3') {
				imageIni_3.xPos += 1;
			}else if (e.target.id === 'zoomin_3') {
				imageIni_3.Scale += 1;
			}else if (e.target.id === 'zoomout_3') {
				imageIni_3.Scale -= 1;
			}else if (e.target.id === 'reset_3'){
				imageIni_3.resetImage();
			}else if (e.target.id === 'dl'){
				return;
			}

			//画像操作時は再描画を行う
			if(imageIni.imageData !== null){
				imageIni.makeImage(imageIni, imageIni_1, imageIni_2, imageIni_3);
			}else{
				$('#alert').text('スクリーンショットを入力してから画像生成を行ってください');
			}

			//画面操作時はURLを再生成する
			write_settingurl(imageIni, imageIni_1, imageIni_2, imageIni_3);
		});

		$('input[name=logo]').click(function() {
			//チェックボックス操作時は再描画を行う
			if(imageIni.imageData !== null){
				imageIni.makeImage(imageIni, imageIni_1);
			}else{
				$('#alert').text('スクリーンショットを入力してから画像生成を行ってください');
			}

			//チェックボックス操作時はURLを再生成する
			write_settingurl(imageIni, imageIni_1, imageIni_2, imageIni_3);
		});

		//初回URL生成
		write_settingurl(imageIni, imageIni_1, imageIni_2, imageIni_3);
	});

	//画像先読み込み
	$(window).on('load',function(){
		//画像のロード
		var baseImg = new Image();
		baseImg.src = $('#logourl').val();
		img = new createjs.Bitmap(baseImg);

		loadImage(null, null);
	});

	// URL生成
	function geturl(imageIni, imageIni_1, imageIni_2, imageIni_3) {
		var url;
		var baseurl = location.href.split('?')[0];
		url = baseurl;

		//設定をgetに追加
		//text
		url = url + '?text_1=' + encodeURIComponent($('#text_1').val());
		url = url + '&color_1=' + encodeURIComponent($('#color_1').val());
		url = url + '&px_1=' + encodeURIComponent($('#px_1').val());
		url = url + '&style_1=' + encodeURIComponent($('#style_1').val());
		url = url + '&font_1=' + encodeURIComponent($('#font_1').val());
		url = url + '&xpos_1=' + imageIni_1.xPos;
		url = url + '&ypos_1=' + imageIni_1.yPos;
		url = url + '&scale_1=' + imageIni_1.Scale;

		//text
		url = url + '&text_2=' + encodeURIComponent($('#text_2').val());
		url = url + '&color_2=' + encodeURIComponent($('#color_2').val());
		url = url + '&px_2=' + encodeURIComponent($('#px_2').val());
		url = url + '&style_2=' + encodeURIComponent($('#style_2').val());
		url = url + '&font_2=' + encodeURIComponent($('#font_2').val());
		url = url + '&xpos_2=' + imageIni_2.xPos;
		url = url + '&ypos_2=' + imageIni_2.yPos;
		url = url + '&scale_2=' + imageIni_2.Scale;

		//text
		url = url + '&text_3=' + encodeURIComponent($('#text_3').val());
		url = url + '&color_3=' + encodeURIComponent($('#color_3').val());
		url = url + '&px_3=' + encodeURIComponent($('#px_3').val());
		url = url + '&style_3=' + encodeURIComponent($('#style_3').val());
		url = url + '&font_3=' + encodeURIComponent($('#font_3').val());
		url = url + '&xpos_3=' + imageIni_3.xPos;
		url = url + '&ypos_3=' + imageIni_3.yPos;
		url = url + '&scale_3=' + imageIni_3.Scale;

		//ロゴURL
		url = url + '&logourl=' + encodeURIComponent($('#logourl').val());
		//ロゴ位置・サイズ
		url = url + '&xpos=' + imageIni.xPos;
		url = url + '&ypos=' + imageIni.yPos;
		url = url + '&scale=' + imageIni.Scale;
		//ロゴ回転
		url = url + '&rotation=' + imageIni.rotation;
		//ロゴ透過
		url = url + '&alpha=' + imageIni.alpha;
		//ロゴ読み出し場所
		if($('input[name=logo]:checked').val() === 'local'){
			url = url + '&logo=local';
		}
		//タイトル
		url = url + '&title=' + encodeURIComponent($('title').text());
		//コメント
		url = url + '&comment=' + encodeURIComponent($('#comment').text());
		return url;
	}

	// URL書き込み
	function write_settingurl(imageIni, imageIni_1, imageIni_2, imageIni_3) {
		var url = geturl(imageIni, imageIni_1, imageIni_2, imageIni_3);
		$('#settingurl a').text(url);
		$('#settingurl a').attr('href', url);
	}
})($);
