import './hook-game.scss'
import * as THREE from 'three';

import React, { useState, useEffect } from 'react';

export default function HookGame() {
  const [count, setCount] = useState(0);

  /* 执行初始化操作，需要注意的是，这里的useEffect的第二个参数必须传空数组，这样它就等价于只在componentDidMount的时候执行。
  如果不传第二个参数的话，它就等价于componentDidMount和componentDidUpdate。*/
  useEffect(() => {
    // 发起请求并执行初始化操作
    /* 1. Three.js 场景只有一种，THREE.Scene 场景是所有物体的容器；
       2. 相机决定了场景中哪个角度的景色会显示出来
       3. 渲染器决定了渲染的结果应该显示在页面的什么元素上，并以怎样的方式绘制。有了这三样东西，才能使用相机将对象渲染到页面中 */
    // 创建场景

    // createScene();

    let WIDTH = window.innerWidth, HEIGHT = window.innerHeight;
    // TODO 此函数中获取高度不一致
    let content = document.getElementById('hook-game-content');
    const { clientWidth, clientHeight } = content;
    console.log(clientWidth, clientHeight, content);
    WIDTH = clientWidth;
    HEIGHT = clientHeight

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, HEIGHT / WIDTH, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    content.appendChild(renderer.domElement);
    // document.body.appendChild();
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    let cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;
    let animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
    const handleWindowResize = () => {
      // 更新渲染器的高度和宽度以及相机的纵横比
      // HEIGHT = window.innerHeight;
      // WIDTH = window.innerWidth;
      let content = document.getElementById('hook-game-content');
      const { clientWidth, clientHeight } = content;
      WIDTH = clientWidth;
      HEIGHT = clientHeight
      console.log(WIDTH, HEIGHT);
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    };
    // 监听屏幕，缩放屏幕更新相机和渲染器的尺寸
    window.addEventListener('resize', handleWindowResize, false);
  }, []);

  return (
    <div className="container">
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <div
        id="hook-game-content"
        className="content"></div>
    </div>
  );
}