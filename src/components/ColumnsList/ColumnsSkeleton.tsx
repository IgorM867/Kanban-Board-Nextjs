function ColumnsSkeleton() {
  return (
    <div className="flex-grow flex p-4 gap-5">
      <ColumnSkeleton />
      <ColumnSkeleton />
      <ColumnSkeleton />
    </div>
  );
}

function ColumnSkeleton() {
  const taskNumber = Math.floor(Math.random() * 3) + 2;
  const taskSkeletons = new Array(taskNumber);

  for (let i = 0; i < taskNumber; i++) {
    taskSkeletons.push(
      <div key={i} className="bg-primary-color animate-pulse h-16 rounded-lg mt-6"></div>
    );
  }

  return (
    <div className="p-2 rounded-md w-64">
      <div className="flex items-center gap-2">
        <div className="size-7 bg-primary-color rounded-full"></div>
        <div className="bg-primary-color flex-grow animate-pulse h-8 rounded-lg"></div>
      </div>
      <ul>{taskSkeletons}</ul>
    </div>
  );
}

export { ColumnsSkeleton };
