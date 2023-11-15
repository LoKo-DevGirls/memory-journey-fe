// TODO: add color palette
const colorList = [
  '#7C05F2',
  '#F2B90C',
  '#F27405',
  '#00D656',
  '#044BD9',
  '#F21F0C',
  '#FFFFFF',
  '#FF00E7'
]

const createGraphData: InitialGraphData | any= (memoryList: any, tagList?: string[]) => {
  let result: any = {};
  let allKeywords: string[] = []; // Can be replaced with tagList?
  for (const memory of  memoryList) {
    for (const tag of memory.tags) {
      if (!allKeywords.includes(tag)) {
        allKeywords.push(tag)
      }
    }
  }

  const { links, groups } = generateLinksAndGroups(memoryList, allKeywords)
  const nodes = [...memoryList]
  nodes.forEach((i: any) => {
    i.groupIds = []
    i.tags.forEach((tag: string) => {
      const [group] = groups.filter((e:any) => e.keyword === tag)
      if (!i.groupIds.includes(group.groupId)) {
        i.groupIds.push(group.groupId)
      }
    })
  })
  
  result = {
    nodes,
    links,
    groups
  }

  return result
}

// Function to generate links based on shared keywords
function generateLinksAndGroups(nodes: any, tagsList: any) {
  const links = [];
  const groups = tagsList.map((tag: any, index: number) => ({
    groupId: index,
    keyword: tag,
    links: [],
    color: colorList[index % colorList.length]
  }));

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const commonTags = nodes[i].tags.filter((tag: any) =>
        nodes[j].tags.includes(tag)
      );

      if (commonTags.length > 0) {
        for (const tag of commonTags) {
          const index = links.push({ 
            linkId: 0, 
            source: nodes[i].id,
            target: nodes[j].id,
            // commonTags, //For debugging
            groupId: tagsList.indexOf(tag)
          });
          links[links.length - 1].linkId = index
         
          const groupIndex = groups.findIndex((i: any) => i.keyword === tag)
          if (groupIndex !== -1) {
            groups[groupIndex].links.push(index)
          }
        }
      }
    }
  }

  return { links, groups };
}

export {createGraphData};
