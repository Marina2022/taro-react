import s from './Tabs.module.scss'

const Tabs = ({tabs, selectedTab, setSelectedTab, label, classname=''}) => {
  return (
    <div className={classname}>
      <div className={s.label}>{label}</div>
      <ul className={s.tabsWrapper}>
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