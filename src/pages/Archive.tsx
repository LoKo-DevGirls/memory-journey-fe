import { useRef, useCallback, useMemo, useState, useEffect } from 'react';
import { ForceGraph3D } from 'react-force-graph'; // https://github.com/vasturiano/react-force-graph
import sampledata from '../dataset/sampledata.json';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import * as THREE from 'three';
import {genRandomTree} from '../utils/randomData.js';

const extraRenderers = [new CSS2DRenderer() as any];

function Archive() {
  const fgRef = useRef<any>();
  const [graphData, setGraphData] = useState<any>(sampledata);
  const [hoveredNodeId, setHoveredNodeId] = useState<number>(0);

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
    nodeEl.style.color = 'white';
    nodeEl.style.opacity = '0.3';
    nodeEl.className = 'node-label';

    // TODO: keywords text styling
    // TODO: content text styling

    return new CSS2DObject(nodeEl);
  }

  const getGeometryFromGroupId = (groupId: number, groupData: any, linksData: any) => {
    const targetGroup = groupData.filter((g: any) => g.groupId === groupId)[0];
    const { links } = targetGroup;
    const linkObjectList = links.map((id: any) => (
      linksData.filter((link: any) => link.linkId === id)[0]
    ));
    
    // TODO: Geometry material styling here
    const material = new THREE.MeshMatcapMaterial({side:THREE.DoubleSide, transparent: true, opacity: 0.06, color: targetGroup.color})
    let geometry = new THREE.BufferGeometry()

    const points:any = [];
    linkObjectList.forEach((linkObj :any) => {
      points.push(new THREE.Vector3(linkObj.source.x, linkObj.source.y, linkObj.source.z))
      points.push(new THREE.Vector3(linkObj.target.x, linkObj.target.y, linkObj.target.z))
    })

    geometry.setFromPoints(points)
    geometry.computeVertexNormals()

    const mesh = new THREE.Mesh(geometry, material);
    return mesh
  }

  const linkThreeObject = (link: any) => {
    const { groupId } = link;
    const object = getGeometryFromGroupId(groupId, graphData.groups, graphData.links);
    return object;
  }

  const linkPositionUpdate = (linkObject: any, {start,end}:{start:any, end:any}, link:any) => {
    const { groupId } = link;
    const updatedLinkMeshObj  = getGeometryFromGroupId(groupId, graphData.groups, graphData.links);
    Object.assign(linkObject.geometry, updatedLinkMeshObj.geometry);
  }

  // const onNodeHover = (node:any) => {
  //   setHoveredNodeId(node.id);
  // }

  return (
    <div>
      <ForceGraph3D
        ref={fgRef}
        extraRenderers={extraRenderers}
        graphData={graphData}
        nodeAutoColorBy="group"
        nodeThreeObject={nodeThreeObject}
        nodeThreeObjectExtend={true} // whether node sphere replace or not
        nodeOpacity={0.05}
        nodeRelSize={1}
        nodeColor={'white'}
        onNodeClick={handleClick}
        linkThreeObject={linkThreeObject}
        linkPositionUpdate={linkPositionUpdate}
        linkOpacity={0.02}
        linkVisibility={true}
        linkThreeObjectExtend={true}
        onNodeDragEnd={node => {
          node.fx = node.x;
          node.fy = node.y;
          node.fz = node.z;
        }}
        // onNodeHover={onNodeHover}
      />
    </div>
  )
}

export default Archive