interface INavLink {
  url: string;
  title: string;
}

export const NavLink = (props: INavLink) => {
  return (
    <a className='font-semibold text-white' href={props.url}>
      {props.title}
    </a>
  );
};
