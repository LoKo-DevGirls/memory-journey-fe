import { useRef, useCallback, useMemo, useState, useEffect } from 'react';
import { ForceGraph3D } from 'react-force-graph'; // https://github.com/vasturiano/react-force-graph
import sampledata from '../dataset/sampledata.json';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import * as THREE from 'three';
import Nav from '../components/Nav';
import Panel from '../components/Panel';
import styles from '../styles/Archive.module.scss';
import axios from 'axios';
import { createGraphData } from '../utils/createGraphData';
import SpriteText from 'three-spritetext';
import Close from '../assets/icon/close';
import Circle from '../assets/icon/circle';

const extraRenderers = [new CSS2DRenderer() as any];

function Archive() {
  const fgRef = useRef<any>();
  const [graphData, setGraphData] = useState<any>();
  const [selectedNode, setSelectedNode] = useState<any>();
  const [selectedGroup, setSelectedGroup] = useState<any>();
  const [highlightLinks, setHighlightLinks] = useState<any>();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try {
        const {data: response} = await axios.get('memory');
        // TODO: remove slice
        const data = createGraphData(response)
        // const data = createGraphData(response.slice(20, 45))


        setGraphData(data)

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

  const closeNodeDescriptionModal = () => {
    setSelectedNode(null)
  }
  
  const nodeThreeObject = (node: any) => {
    // TODO: node styling here
    const nodeEl = document.createElement('div');
    nodeEl.textContent = node.content;
    nodeEl.className = styles.nodeEl;
    nodeEl.style.pointerEvents= 'all';
    nodeEl.addEventListener('click', event => {
      handleClick(node)
      nodeEl.classList.add(styles.selected)
    })
    
    return new CSS2DObject(nodeEl);
  }

  const nodeSpriteText = (node: any) => {
    const checkLineBreak = (text: string, wordsLength = 50) => {
      let resultText:any = text.split(" ");

      const symbol = "\n";
    
      if (resultText.length > wordsLength) {
        for (let i = 1; i < resultText.length; i++) {
          if (i % wordsLength == 0) {
            resultText.splice(i, 0, symbol);
          } else {
            continue;
          }
        }
      }
      resultText = resultText.join(" ");
      return resultText;
    };
    // https://github.com/vasturiano/three-spritetext
    const sprite = new SpriteText(checkLineBreak(node.content));
    sprite.textHeight = 8;
    sprite.fontFace = 'Roboto';
    sprite.strokeWidth = 0;
    // sprite.material.depthWrite = false;
    // sprite.fontWeight = 'Light';
    return sprite;
  }
  
  const NodeDescription = () => {
    if (!selectedNode) return;
    const node = selectedNode;

    return (
      <section className={`${styles.descSection}`}>
        <button onClick={closeNodeDescriptionModal} className={styles.closeButton}><Close /></button>
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
        <ul className={styles.keywords}><b>Keywords:</b> 
          {node.tagGroups.map((i:any) => (
            <li key={i.groupId}>
              <button onClick={() => handleKeywordClick(i)}>
                <p style={{color: i.color}}>
                  {i.keyword}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  const PanelContent = () => {
    if (!graphData) return

    const keywordsList = graphData.groups.filter((g:any) => g.links.length > 0).sort((a: any,b: any) => b.links.length - a.links.length )

    return (
      <section className={styles.panelSection}>
        <ul>
          {keywordsList.map((i: any) => (
            <li key={i.keyword}>
              <button onClick={() => handleKeywordClick(i)}>
                <Circle color={i.color} />
                <p>
                  {i.keyword} <span>{i.links.length}</span>
                </p>
              </button>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  const handleKeywordClick = (keyword: any) => {
    setHighlightLinks(keyword.links)
    setSelectedGroup(keyword)
  }
  const resetSelectedGroup = () => {
    setHighlightLinks(null)
    setSelectedGroup(null)
  }
  const getGeometryFromGroupId = (groupId: number, groupData: any, linksData: any) => {
    const targetGroup = groupData.find((g: any) => g.groupId === groupId);
    const { links } = targetGroup;
    const linkObjectList = links.map((id: any) => (
      linksData.find((link: any) => link.linkId === id)
    ));
    
    // TODO: Geometry material styling here
    const material = new THREE.MeshMatcapMaterial({side:THREE.DoubleSide, transparent: true, opacity: 0, color: targetGroup.color})
    // const material = new THREE.MeshPhysicalMaterial({transmission:1, thickness: 2, roughness: 0.5})
    // const material = new THREE.MeshPhongMaterial( {
    //   color: 0xaaaaaa, specular: 0xffffff, shininess: 100,
    //   side: THREE.DoubleSide, vertexColors: true
    // } );
    
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
        // nodeLabel={hoverContent}
        // nodeThreeObject={nodeSpriteText}
        nodeThreeObject={nodeThreeObject}
        // nodeThreeObjectExtend={false} // whether node sphere replace or not
        onNodeClick={handleClick}
        linkOpacity={0.5}
        linkVisibility={true}
        // linkWidth={link => highlightLinks?.includes(link.linkId) ? 0.2 : 0.001}
        linkColor={link => highlightLinks?.includes(link.linkId) ? selectedGroup?.color :'#fff'}
        onBackgroundClick={resetSelectedGroup}
        // linkThreeObject={linkThreeObject} // for plane geometry
        // linkPositionUpdate={linkPositionUpdate} // for plane geometry
        // linkThreeObjectExtend={true} // for plane geometry
        onNodeDragEnd={node => {
          node.fx = node.x;
          node.fy = node.y;
          node.fz = node.z;
        }}
      />
      <NodeDescription />
      <Panel
        onToggleClick={resetSelectedGroup}
      >
        <PanelContent />
      </Panel>
    </div>
  )
}

export default Archive