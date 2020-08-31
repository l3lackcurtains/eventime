const reorderArray: any = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const dragItemsBetweenArray: any = (
  source: any,
  destination: any,
  droppableSource: any,
  droppableDestination: any
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const groupedTimerRecords: any = (data: any) => {
  if (!data) {
    return {};
  }
  const groups = data.reduce((groups: any, rec: any) => {
    const date = rec.date.split("T")[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(rec);
    return groups;
  }, {});

  const groupArrays = Object.keys(groups).map((date) => {
    const groupByTask = groups[date].reduce((groups: any, rec: any) => {
      const taskId = rec.task.id;
      if (!groups[taskId]) {
        groups[taskId] = [];
      }
      groups[taskId].push(rec);
      return groups;
    }, {});

    const groupTaskArray = Object.keys(groupByTask).map((task) => {
      const totalDuration = groupByTask[task].reduce(
        (sum: any, dur: any) => parseInt(dur.duration) + sum,
        0
      );
      return {
        task: groupByTask[task][0].task.name,
        totalDuration,
        taskRecords: groupByTask[task],
      };
    });

    return {
      date,
      dateRecords: groupTaskArray,
    };
  });

  return groupArrays;
};

const getTaskRecordsTotalHour = (task: any) => {
  if (!task.timerRecords) return 0;
  const total = task.timerRecords.reduce(
    (sum: number, tr: any) => sum + parseInt(tr.duration),
    0
  );
  return Math.floor(total / 3600);
};

export {
  reorderArray,
  dragItemsBetweenArray,
  groupedTimerRecords,
  getTaskRecordsTotalHour,
};
