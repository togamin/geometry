// ページの読み込み終了後に実行
window.addEventListener('load', init);
// リサイズイベント発生時に実行
var timer = false;
window.addEventListener('resize', function() {
  if (timer !== false) {
    clearTimeout(timer);
  }
  timer = setTimeout(function() {
    init();
  }, 100);
});

function init() {

  // サイズを指定
  const width = window.innerWidth;
  const height = window.innerHeight;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#geometry')
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);//描画サイズ
  renderer.setClearColor(new THREE.Color(0x0000000));//背景色

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 0, +3);

  //ライト作成
  const light = new THREE.DirectionalLight(0xffffff);
  light.intensity = 1.5; // 光の強さを倍に
  light.position.set(1, 2, 3);
  light.lookAt(new THREE.Vector3(0, 0, 0));//原点を見つめる
  scene.add(light);//シーンに追加

  //インスタンスの生成
  var geometry = new THREE.Geometry();

  //頂点座標の追加
  geometry.vertices.push(new THREE.Vector3(0, 0, 1));
  geometry.vertices.push(new THREE.Vector3(1, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, -1, 0));
  geometry.vertices.push(new THREE.Vector3(-1, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, 1, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, -1));

  //面の作成
  geometry.faces.push(new THREE.Face3( 0, 2, 1));
  geometry.faces.push(new THREE.Face3( 0, 3, 2));
  geometry.faces.push(new THREE.Face3( 0, 4, 3));
  geometry.faces.push(new THREE.Face3( 0, 1, 4));
  geometry.faces.push(new THREE.Face3( 5, 1, 2));
  geometry.faces.push(new THREE.Face3( 5, 2, 3));
  geometry.faces.push(new THREE.Face3( 5, 3, 4));
  geometry.faces.push(new THREE.Face3( 5, 4, 1));

  //法線ベクトルの指定
　geometry.computeFaceNormals();
	geometry.computeVertexNormals();

　//八面体のメッシュ作成
　var material = new THREE.MeshLambertMaterial({color: 0x8dc3ff})
　var mesh = new THREE.Mesh(geometry, material);
　scene.add(mesh);

 //ワイヤーフレームのメッシュ作成
 var wire = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
 var wireMesh = new THREE.Mesh(geometry, wire);
 scene.add(wireMesh);

  // カメラコントローラーを作成
  new THREE.OrbitControls(camera);

  //地面
  const plane = new THREE.GridHelper(3, 9, 0x888888, 0x888888);
  scene.add(plane);

 tick();
  // 毎フレーム時に実行されるループイベントです
  function tick() {
    renderer.render(scene, camera);// レンダリング
    requestAnimationFrame(tick);
  }
}
