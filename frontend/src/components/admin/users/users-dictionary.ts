export interface UsersColumnsDictionary {
  id: string;
  user: string;
  accessLevel: string;
  projectRoles: string;
  joinedDate: string;
  changeRole: string;
  saving: string;
  superAdmin: string;
  admin: string;
  userRole: string;
  unverifiedUser: string;
  noProjectRoles: string;
  projectOwner: string;
  projectCreator: string;
  projectManager: string;
  designer: string;
  developer: string;
  frontendDeveloper: string;
  backendDeveloper: string;
  qa: string;
  marketer: string;
  businessAnalyst: string;
}

export interface UsersPageDictionary {
  title: string;
  titleHighlight: string;
  description: string;
  directory: string;
  totalUsers: string;
  noUsersFound: string;
  failedToLoadUsers: string;
  failedToUpdateRole: string;
}

export interface UsersDictionary {
  page: UsersPageDictionary;
  columns: UsersColumnsDictionary;
}
