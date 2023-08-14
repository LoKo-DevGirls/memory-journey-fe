import { useRef, useCallback } from 'react';
import { ForceGraph3D } from 'react-force-graph';
import mockupdata from '../assets/mockupdata.json';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import {Object3D, Vector3} from 'three';
import SpriteText from 'three-spritetext';
import * as THREE from 'three';

const extraRenderers = [new CSS2DRenderer() as any];

function Archive() {

  const fgRef = useRef<any>();

  const handleClick = useCallback((node: any) => {
    // Aim at node from outside it
    const distance = 40;
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
    
    fgRef.current.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
      node, // lookAt ({ x, y, z })
      3000  // ms transition duration
    );
    
  }, [fgRef]);

  const nodeThreeObject = (node: any) => {
    const nodeEl = document.createElement('div');
    nodeEl.textContent = node.id;
    nodeEl.style.color = node.color;
    nodeEl.className = 'node-label';
    return new CSS2DObject(nodeEl);
  }

  const getGeometry = (link:any) => {
    const { source,target } = link

    const material = new THREE.MeshNormalMaterial({side:THREE.DoubleSide})
    let geometry = new THREE.BufferGeometry()
    const points = [
      new THREE.Vector3(source.x,source.y,source.z), 
      new THREE.Vector3(target.x, target.y, target.z),
      // ... TODO: Add more points to draw surface
      // new THREE.Vector3(200, 200, 200),
      // TODO: Add case when link group cannot draw surface (group less than 3)
    ]

    geometry.setFromPoints(points)
    geometry.computeVertexNormals()

    const mesh = new THREE.Mesh(geometry, material);
    return mesh
  }

  const linkThreeObject = (link: any) => {
    return getGeometry(link)
  }

  // const linkPositionUpdate = (sprite: Object3D<THREE.Event>, { start, end }: { start: any; end: any; }) => {
  //   const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
  //     [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
  //   })));

  //   Position sprite
  //   Object.assign(sprite.position, middlePos);
  // }

  return (
    <div>
      <ForceGraph3D
        extraRenderers={extraRenderers}
        graphData={mockupdata}
        nodeAutoColorBy="group"
        nodeThreeObject={nodeThreeObject}
        nodeThreeObjectExtend={true}
        ref={fgRef}
        onNodeClick={handleClick}
        linkVisibility={false}
        nodeRelSize={1}
        nodeColor={'white'}
        linkThreeObjectExtend={true}
        linkThreeObject={linkThreeObject}
        // linkPositionUpdate={linkPositionUpdate}
      />
    </div>
  )
}

export default Archive