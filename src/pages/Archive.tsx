import { useRef, useCallback, useMemo, useState, useEffect } from 'react';
import { ForceGraph3D } from 'react-force-graph'; // https://github.com/vasturiano/react-force-graph
import sampledata from '../dataset/sampledata.json';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import * as THREE from 'three';
import Nav from '../components/Nav';
import styles from '../styles/Archive.module.scss';
import axios from 'axios';
import { createGraphData } from '../utils/createGraphData';

const extraRenderers = [new CSS2DRenderer() as any];

function Archive() {
  const fgRef = useRef<any>();
  const [graphData, setGraphData] = useState<any>(sampledata);
  const [selectedNode, setSelectedNode] = useState<any>();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try {
        const {data: response} = await axios.get('memory');
        const data = createGraphData(response)
        // TODO:
        // setGraphData(data)
      } catch (error: any) {
        console.error(error.message);
      }
      setLoading(false);
    }

    fetchData();
    
    return () => {
    }
  }, [])
  
  const handleClick = useCallback((node: any) => {
    // Aim at node from outside it
    const distance = 40;
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
    
    fgRef.current.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
      node, // lookAt ({ x, y, z })
      3000  // ms transition duration
    );

    setSelectedNode(node)
  }, [fgRef]);

  const onBackgroundClick = () => {
    setSelectedNode(null)
  }
  
  const nodeThreeObject = (node: any) => {
    const nodeEl = document.createElement('div');
    // nodeEl.textContent = node.id;
    nodeEl.style.color = 'white';
    nodeEl.style.opacity = '0.3';

    return new CSS2DObject(nodeEl);
  }
  
  const NodeDescription = ({node}: any) => {
    return (
      node &&
      <section className={`${styles.descSection}`}>
        <p>{node.content}</p>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <input value={node.time} disabled type="range" min="0" max="100" step="1" list='timeValues' />
            <datalist id="timeValues">
              <option value="0" label="old"></option>
              <option value="100" label="recent"></option>
            </datalist>
          </div>

          <div className={styles.inputWrapper}>
            <input value={node.feeling} disabled type="range" min="0" max="100" step="1" list='feelingValues' />
            <datalist id="feelingValues">
              <option value="0" label="good"></option>
              <option value="100" label="bad"></option>
            </datalist>
          </div>

          <div className={styles.inputWrapper}>
            <input value={node.consciousness} disabled type="range" min="0" max="100" step="1" list='consciousnessValues' />
            <datalist id="consciousnessValues">
              <option value="0" label="vivid"></option>
              <option value="100" label="vague"></option>
            </datalist>
          </div>
        </div>
        <p className={styles.Keywords}>Keywords: 
          {node.tags.map((i:any, index: any) => (
            <span key={index}>{i}</span>
          ))}
        </p>
      </section>
    )
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

  const hoverContent = (node: any) => {
    function truncateString(str: string, num:number) {
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
    }
    return truncateString(node.content, 20)
  }
  return (
    <div>
      <Nav />
      <ForceGraph3D
        ref={fgRef}
        extraRenderers={extraRenderers}
        graphData={graphData}
        nodeAutoColorBy="group"
        nodeLabel={hoverContent} // TODO: hovered content
        nodeThreeObject={nodeThreeObject}
        nodeThreeObjectExtend={true} // whether node sphere replace or not
        nodeOpacity={0.15}
        nodeRelSize={2}
        nodeColor={'white'}
        onNodeClick={handleClick}
        onBackgroundClick={onBackgroundClick}
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
      <NodeDescription node={selectedNode}/>
    </div>
  )
}

export default Archive