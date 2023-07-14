import { ForceGraph3D } from 'react-force-graph';
import mockupdata from '../assets/mockupdata.json';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

const extraRenderers = [new CSS2DRenderer()];

// import axios from 'axios';
import { useRef, useCallback } from 'react';

function Archive() {
  // const [archiveData, setArchiveData] = useState([]);

  // const fetchArchive = () => {};

  // useEffect(() => {
  //   fetchArchive();
  //   return () => {
  //   }
  // }, [])

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

  return (
    <div>
      <ForceGraph3D
        extraRenderers={extraRenderers}
        graphData={mockupdata}
        nodeAutoColorBy="group"
        nodeThreeObject={(node: any) => {
          const nodeEl = document.createElement('div');
          nodeEl.textContent = node.id;
          nodeEl.style.color = node.color;
          nodeEl.className = 'node-label';
          return new CSS2DObject(nodeEl);
        }}
        nodeThreeObjectExtend={true}
        ref={fgRef}
        onNodeClick={handleClick}
        />
    </div>
  )
}

export default Archive