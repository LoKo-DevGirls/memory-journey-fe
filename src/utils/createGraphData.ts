const createGraphData: InitialGraphData | any= (memoryList: any, tagList: string[]) => {
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

  for (let i = 0; i < allKeywords.length; i++) {
    const groupLinks: any = [];
    const color = 'white';
    // TODO: links data
    groups.push({
      groupId: i,
      keyword: allKeywords[i],
      links: groupLinks,
      color
    })
  }
  console.log(groups)
  return result
}

export {createGraphData};
