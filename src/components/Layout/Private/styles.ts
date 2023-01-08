import styled from 'styled-components'

export const Content = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: center;
  flex-wrap: nowrap;
  height: fit-content;
  justify-content: center;
  justify-items: center;
  margin-top: 10px;
  padding: 20px;
  width: 100%;
`

export const Main = styled('div')`
  &.openSidebar {
    left: 15rem;
    width: calc(100% - 15rem);
  }
  height: 100vh;
  left: 5rem;
  overflow: hidden;
  overflow-y: auto;
  position: absolute;
  transition: all 0.5s ease-in-out;
  width: calc(100% - 4.875rem);
`

export const Wrapper = styled.div`
  align-items: center;
  background: #fff;
  display: flex;
  flex-direction: row;
  gap: 0;
  height: 100vh;
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 100%;
`

export const toastifyWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  position: relative;
  width: 100%;
`

export const paragrafTitle = styled('div')`
  font-size: 15px;
  font-weight: bold;
`

export const paragrafContent = styled('div')`
  font-size: 12px;
  font-weight: 600;
`
