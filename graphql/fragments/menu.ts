export const MENU_ITEM_FRAGMENT = `
  fragment menuItem on MenuItem {
    id
    title
    url
    type
    items {
      id
      title
      url
      type
      items {
        id
        title
        url
        type
      }
    }
  }
`;

export const MENU_FRAGMENT = `
  fragment menu on Menu {
    id
    handle
    title
    items {
      ...menuItem
    }
  }
  ${MENU_ITEM_FRAGMENT}
`;
