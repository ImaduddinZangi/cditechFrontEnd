import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupPermissionResponse } from "./groupPermissionsSlice";

export interface UserGroup {
  id?: string;
  name: string;
  description?: string;
  color?: string;
  isDefaultAdminGroup?: boolean;
  createdAt?: string;
  updatedAt?: string;
  permissions?: GroupPermissionResponse[];
}

interface UserGroupState {
  userGroups: UserGroup[] | null;
}

const initialState: UserGroupState = {
  userGroups: null,
};

const userGroupSlice = createSlice({
  name: "userGroup",
  initialState,
  reducers: {
    setUserGroups: (state, action: PayloadAction<UserGroup[]>) => {
      state.userGroups = action.payload;
    },
    addUserGroup: (state, action: PayloadAction<UserGroup>) => {
      state.userGroups?.push(action.payload);
    },
    updateUserGroup: (state, action: PayloadAction<UserGroup>) => {
      const index = state.userGroups?.findIndex(
        (userGroup) => userGroup.id === action.payload.id
      );
      if (index !== undefined && index !== -1 && state.userGroups) {
        state.userGroups[index] = action.payload;
      }
    },
    removeUserGroup: (state, action: PayloadAction<string>) => {
      state.userGroups =
        state.userGroups?.filter(
          (userGroup) => userGroup.id !== action.payload
        ) || null;
    },
  },
});

export const { setUserGroups, addUserGroup, updateUserGroup, removeUserGroup } =
  userGroupSlice.actions;
export default userGroupSlice.reducer;
