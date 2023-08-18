import { useRef, useCallback, useMemo, useState } from 'react';
import { ForceGraph3D } from 'react-force-graph'; // https://github.com/vasturiano/react-force-graph
import sampledata from '../dataset/sampledata.json';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import {Object3D, Vector3} from 'three';
import SpriteText from 'three-spritetext';
import * as THREE from 'three';
import {genRandomTree} from '../utils/randomData.js';

const extraRenderers = [new CSS2DRenderer() as any];

function Archive() {
  const fgRef = useRef<any>();

  const groupData = useMemo(() => {
    return sampledata.groups
  }, []);
  const linksData = useMemo(() => {
    return sampledata.links
  }, []);
  const nodesData = useMemo(() => {
    return sampledata.nodes
  }, []);
  const [geometry, setGeometry] = useState();

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
    const geometryGroup = new THREE.Group();
    const { groupIds } = node;
    groupIds.forEach((id: number):void => {
      geometryGroup.add(getGeometryFromGroupId(id));
    });

    return geometryGroup
  }

  const getGeometryFromGroupId = (groupId: number) => {
    const targetGroup = groupData.filter(g => g.groupId === groupId)[0];
    const { links } = targetGroup;
    const linkObjectList = links.map(id => (
      linksData.filter(link => link.linkId === id)[0]
    ));

    const material = new THREE.MeshNormalMaterial({side:THREE.DoubleSide})
    let geometry = new THREE.BufferGeometry()
    
    const points:any = [];
    linkObjectList.forEach(linkObj => {
      points.push(new THREE.Vector3(linkObj.source.x, linkObj.source.y, linkObj.source.z))
      points.push(new THREE.Vector3(linkObj.target.x, linkObj.target.y, linkObj.target.z))
    })

    geometry.setFromPoints(points)
    geometry.computeVertexNormals()

    const mesh = new THREE.Mesh(geometry, material);
    return mesh
  }

  return (
    <div>
      <ForceGraph3D
        extraRenderers={extraRenderers}
        graphData={sampledata}
        nodeAutoColorBy="group"
        nodeThreeObject={nodeThreeObject}
        nodeThreeObjectExtend={true}
        nodeOpacity={0.5}
        ref={fgRef}
        onNodeClick={handleClick}
        linkVisibility={true}
        nodeRelSize={1}
        nodeColor={'white'}
        linkThreeObjectExtend={true}
        // linkThreeObject={linkThreeObject}
      />
    </div>
  )
}

export default Archive