// wwwroot/js/forceGraphComponent.js

// import React from 'react';
// import ReactDOM from 'react-dom';
// import ForceGraph2D from 'react-force-graph-2d';

//  import * as THREE from '//unpkg.com/three/build/three.module.js';

window.renderForceGraph = (elementId, nodes, links) => {
    // const imgs = ['cat.jpg', 'dog.jpg', 'eagle.jpg', 'elephant.jpg', 'grasshopper.jpg', 'octopus.jpg', 'owl.jpg', 'panda.jpg', 'squirrel.jpg', 'tiger.jpg', 'whale.jpg'];

    // // Random connected graph
    // const gData = {
    //   nodes: imgs.map((img, id) => ({ id, img })),
    //   links: [...Array(imgs.length).keys()]
    //     .filter(id => id)
    //       .map(id => ({
    //         source: id,
    //         target: Math.round(Math.random() * (id-1))
    //       }))
    // };

    // const ForceGraphComponent = () => {
    //     return React.createElement(ForceGraph3D, {
    //         graphData: gData,
    //         nodeThreeObject: ({ img }) => {
    //             const imgTexture = new THREE.TextureLoader().load(`./imgs/${img}`);
    //             imgTexture.colorSpace = THREE.SRGBColorSpace;
    //             const material = new THREE.SpriteMaterial({ map: imgTexture });
    //             const sprite = new THREE.Sprite(material);
    //             sprite.scale.set(12, 12);
    //             return sprite;
    //         }
    //     })
    // }


    const ForceGraphComponent = () => {
        return React.createElement(ForceGraph2D, {
            graphData: { nodes, links },
            width: 500,
            height: 500,
            backgroundColor: '#222',
        });
    };

    ReactDOM.render(
        React.createElement(ForceGraphComponent),
        document.getElementById(elementId)
    );
};

// window.renderForceGraph = (elementId, nodes, links) => {
//     if (!nodes || !links) {
//         console.error("Invalid graphData:",nodes);
//         return;
//     }

//     const IMAGE_SIZE = 24;
//     const ZOOM = 1.7;
//     const FORCE_LINK_DISTANCE = IMAGE_SIZE * 6;
//     const FORCE_MANYBODIES_STRENGTH = -(IMAGE_SIZE * 4);

//     const syncLoadAllImages = (imageQueue, callback) => {
//         let numAll = imageQueue.length;
//         let numProcessed = 0;
//         let allImages = new Map();

//         if (numAll === 0) {
//             callback(allImages);
//             return;
//         }

//         imageQueue.forEach(e => {
//             const image = new Image();
//             const id = e.id;

//             image.addEventListener("load", () => {
//                 numProcessed++;
//                 allImages.set(id, image);
//                 if (numAll === numProcessed) {
//                     if (callback) {
//                         callback(allImages);
//                         return;
//                     }
//                 }
//             });
//             image.src = e.image;
//         });
//     };

//     const paintNodes = (imageMap, node, ctx, globalScale) => {
//         if ((!node.x && isNaN(node.x)) || (!node.y && isNaN(node.y))) {
//             return;
//         }
//         const image = imageMap.get(node.id);
//         if (image) {
//             ctx.drawImage(
//                 image,
//                 node.x - IMAGE_SIZE / 2,
//                 node.y - IMAGE_SIZE / 2,
//                 IMAGE_SIZE,
//                 IMAGE_SIZE
//             );
//         }
//     };

//     // 该函数内的代码将在React环境中运行
//     const ForceGraph = () => {
//         const [imageMap, setImageMap] = React.useState(null);
//         const graphRef = React.createRef();

//         React.useEffect(() => {
//             if (!imageMap) {
//                 const images = nodes.map(e => ({
//                     id: e.id,
//                     image: e.icon
//                 }));
//                 syncLoadAllImages(images, loadedImages => {
//                     setImageMap(loadedImages);

//                     setTimeout(() => {
//                         graphRef.current.d3Force("link")
//                             .iterations(1)
//                             .distance(FORCE_LINK_DISTANCE);

//                         graphRef.current.d3Force("charge")
//                             .strength(FORCE_MANYBODIES_STRENGTH)
//                             .distanceMin(FORCE_MANYBODIES_STRENGTH / 2)
//                             .distanceMax(FORCE_MANYBODIES_STRENGTH);

//                         graphRef.current.d3Force(
//                             "collide",
//                             d3.forceCollide(IMAGE_SIZE)
//                                 .strength(0.2)
//                                 .iterations(1)
//                         );

//                         graphRef.current.zoom(ZOOM, 0);
//                         graphRef.current.refresh();
//                     }, 0);
//                 });
//             }
//         }, [imageMap]);

//         if (!imageMap) return null;

//         return React.createElement(ForceGraph2D, {
//             ref: graphRef,
//             graphData: { nodes, links },
//             width: 500,
//             height: 500,
//             backgroundColor: '#222',
//             // graphData: graphData,
//             nodeVal: IMAGE_SIZE,
//             linkOpacity: 1,
//             nodeCanvasObject: (node, ctx, globalScale) => 
//                 paintNodes(imageMap, node, ctx, globalScale)
//         });
//     };

//     ReactDOM.render(
//         React.createElement(ForceGraph),
//         document.getElementById(elementId)
//     );
// };


