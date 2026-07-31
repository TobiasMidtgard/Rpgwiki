import { Link } from 'react-router-dom'
import { EmptyState } from '../components/ui'

export default function NotFound() {
  return (
    <div className="main-pad">
      <EmptyState title="That page does not exist">
        The address you followed is not part of this wiki. <Link to="/">Back to the dashboard</Link>, or{' '}
        <Link to="/atlas">open the atlas</Link>.
      </EmptyState>
    </div>
  )
}
