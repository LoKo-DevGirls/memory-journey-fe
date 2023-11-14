const createGraphData: InitialGraphData | any= (memoryList: any, tagList?: string[]) => {
  const result: any = {};
  const groups: any = [];
  const links: any = [];
  const nodes: any = [];
  let allKeywords: string[] = []; // Can be replaced with tagList?
  for (const memory of  memoryList) {
    for (const tag of memory.tags) {
      if (!allKeywords.includes(tag)) {
        allKeywords.push(tag)
      }
    }
  }

  console.log('list: ', generateLinks(memoryList))
  return result
}

// Function to generate links based on shared keywords
function generateLinks(nodes: any) {
  const links = [];

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const commonTags = nodes[i].tags.filter((tag: any) =>
        nodes[j].tags.includes(tag)
      );

      if (commonTags.length > 0) {
        const index = links.push({ linkId: 0, source: i, target: j, commonTags });
        links[links.length - 1].linkId = index
      }
    }
  }

  return links;
}

export {createGraphData};
