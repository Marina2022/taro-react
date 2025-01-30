import s from './Tabs.module.scss'

const Tabs = ({tabs, selectedTab, setSelectedTab, label, classname='', direction='horizontal'}) => {
  return (
    <div className={classname}>
      <div className={s.label}>{label}</div>
      <ul className={direction === 'horizontal' ? s.tabsWrapper : s.tabsWrapperVertical}>
        {
          tabs.map((tab, i) => {
            return (
              <li 
                key={i}
                onClick={()=>setSelectedTab(tab.value)}
                className={ selectedTab === tab.value ? s.tabItemActive : s.tabItem}>
                {tab.label}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Tabs;