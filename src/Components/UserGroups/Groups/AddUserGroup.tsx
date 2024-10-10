import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../Tags/InputField";
import PurpleButton from "../../Tags/PurpleButton";
import WhiteButton from "../../Tags/WhiteButton";
import { UserGroup } from "../../../redux/features/userGroupSlice";

interface AddUserGroupProps {
  onSubmit: (data: UserGroup) => void;
  initialData?: Partial<UserGroup>;
}

const AddUserGroup: React.FC<AddUserGroupProps> = ({
  onSubmit,
  initialData,
}) => {
  const [name, setName] = useState<string>(initialData?.name || "");
  const [description, setDescription] = useState<string>(
    initialData?.description || ""
  );
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ id: initialData?.id, name, description });
  };

  const handleCancel = () => {
    navigate("/user-group-table");
  };
  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <form
        className="grid grid-cols-2 gap-[1vw] relative"
        onSubmit={handleSubmit}
      >
        <InputField
          label="Group Name"
          name="name"
          fieldType="text"
          value={name}
          placeholder="Enter Group name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <InputField
          label="Description"
          name="description"
          fieldType="text"
          value={description}
          placeholder="Enter Group description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <div></div>
        <div className="mt-[1vw] flex justify-end">
          <PurpleButton type="submit" text="Create" className="mr-[1vw]" />
          <WhiteButton type="button" text="Cancel" onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
};

export default AddUserGroup;
