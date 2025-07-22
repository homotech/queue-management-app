interface QueueStatusProps {
  status: string;
}
const QueueStatus = ({ status }: QueueStatusProps) => {
  if (status === "Done") {
    return <div className="px-4 py-2 border-2 rounded-full">Done</div>;
  } else if (status === "In Service") {
    return <div className="px-4 py-2 border-2 rounded-full">In Service</div>;
  } else {
    return <div className="px-4 py-2 border-2 rounded-full">Waiting</div>;
  }
};
export default QueueStatus;
