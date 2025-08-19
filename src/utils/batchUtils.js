export const getStatusStyle = (status) => {
  switch (status) {
    case "COMPLETED":
      return "bg-green-500 text-white font-bold py-1 px-3 rounded-full border border-green-600";
    case "FAILED":
      return "bg-red-500 text-white font-bold py-1 px-3 rounded-full border border-red-600";
    case "STARTED":
      return "bg-yellow-500 text-white font-bold py-1 px-3 rounded-full border border-yellow-600";
    default:
      return "bg-gray-500 text-white font-bold py-1 px-3 rounded-full border border-gray-600";
  }
};

export const generateCSVReport = (jobData, stepData, itemData) => {
  try {
    // if (!jobData.length || !jobData[0]) {
    //   console.error("No job data available to generate CSV.");
    //   return;
    // }
    let csvContent = "data:text/csv;charset=utf-8,";

    // Add Job Details
    csvContent += `Job Details\n`;
    csvContent += `Job ID,Status,Start Time,End Time,Last Updated\n`;
    csvContent += `${jobData.jobExecutionId},${jobData.status},${new Date(jobData.startTime).toLocaleString()},${jobData.endTime ? new Date(jobData.endTime).toLocaleString() : "-"},${new Date(jobData.lastUpdated).toLocaleString()}\n\n`;

    // Add Step Executions
    csvContent += `Step Executions\n`;
    csvContent += `Step Name,Status,Read Count,Write Count,Commit Count,Errors Count,Read Skip Count\n`;
    stepData.forEach((step) => {
      csvContent += `${step.stepName},${step.status},${step.readCount},${step.writeCount},${step.commitCount},${step.errorCount || 0},${step.readSkipCount || 0}\n`;
    });
    csvContent += `\n`;

    // Add Item Executions
    csvContent += `Item Executions\n`;
    csvContent += `Item ID,Status,Start Time,End Time,Operation Type,Execution Message\n`;
    itemData.forEach((item) => {
      csvContent += `${item.itemId},${item.status},${new Date(item.startTime).toLocaleString()},${item.endTime ? new Date(item.endTime).toLocaleString() : "-"},${item.operationType},${item.message}\n`;
    });

    // Encode URI
    const encodedUri = encodeURI(csvContent);

    // Create and trigger download
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "batch-report.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error generating CSV report:", error);
  }
};
