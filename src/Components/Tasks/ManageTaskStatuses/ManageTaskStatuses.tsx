import React from 'react'
import WhiteButton from '../../Tags/WhiteButton'
import { useGetTaskStatusesQuery } from '../../../redux/api/taskStatusApi'

const ManageTaskStatuses: React.FC = () => {

    const { data: taskStatusData } = useGetTaskStatusesQuery();

    return (
        <div className="p-[2vw]">
            <p className='block text-[1vw] font-medium text-gray-0 mb-[1vw]'>
                *Task status cannot be changed or edited
            </p>
            <div className="w-full grid grid-cols-2 gap-[2vw]">
                {taskStatusData?.map((status) => (
                    <WhiteButton text={status.name} key={status.id} disabled />
                ))}
            </div>
        </div>
    )
}

export default ManageTaskStatuses