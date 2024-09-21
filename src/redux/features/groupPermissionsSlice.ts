import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GroupPermissionResponse {
  id: string;
  permissionName: string;
  canView: boolean;
  canEdit: boolean;
  canCreate: boolean;
  canDelete: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id?: string;
  resource: string;
  actions: string[];
}

interface GroupPermissionState {
  permissions: Permission[] | null;
  permissionResponses: GroupPermissionResponse[] | null;
}

const initialState: GroupPermissionState = {
  permissions: null,
  permissionResponses: null,
};

const groupPermissionsSlice = createSlice({
  name: "groupPermissions",
  initialState,
  reducers: {
    setPermissions: (state, action: PayloadAction<Permission[]>) => {
      state.permissions = action.payload;
    },
    setPermissionResponses: (state, action: PayloadAction<GroupPermissionResponse[]>) => {
      state.permissionResponses = action.payload;
    },
    updatePermission: (state, action: PayloadAction<Permission>) => {
      const index = state.permissions?.findIndex(
        (permission) => permission.resource === action.payload.resource
      );
      if (index !== undefined && index !== -1 && state.permissions) {
        state.permissions[index] = action.payload;
      }
    },
  },
});

export const { setPermissions, setPermissionResponses, updatePermission } =
  groupPermissionsSlice.actions;
export default groupPermissionsSlice.reducer;
