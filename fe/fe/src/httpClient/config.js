export const CONFIG = {
  baseUrl: import.meta.env.VITE_API_KEY,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const END_POINT = {
  login: '/api/auth/signin',
  listRecords: '/users/ad',
  listUsers: '/users',
  checkUser: '/users/check',
  disableUser: '/users/disable',
  updatePasswordFirstTime: '/update-password-first-time',
  changePassword: '/users/change-password',
  checkPassword: '/users/get-password',
  getValidAssetsForAssignment: '/assets/available-for-assignment',
  createNewAssignment: '/assignments',
  report: '/reports',
  getValidAssetsForUpdateAssignment: '/assets/available-for-update-assignment',
  userAssignList: '/assignments/my-assignments',
  assignmentDetail: '/assignment',
  acceptReturnRequest: '/return-requests/accept',
};
