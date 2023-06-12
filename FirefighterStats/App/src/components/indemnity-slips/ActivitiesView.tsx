import './ActivitiesView.scss';
import Activity from '../../types/Activity';
import React from 'react';

interface IActivitiesViewProps {
    activities: Activity[];
}

const ActivitiesView = ({ activities }: IActivitiesViewProps) => {
    return (
        <div className='activities-view'>
            <h2 className='activities-view__title'>Activities</h2>
            <div className='activities-view__grid'>
                <div className='activities-view__grid__header activities-view__grid__header--title'>Title</div>
                <div className='activities-view__grid__header'>Duration (in hour)</div>
                <div className='activities-view__grid__header'>Rate %</div>
                <div className='activities-view__grid__header'>Unit amount</div>
                <div className='activities-view__grid__header'>Amount €</div>

                {activities.map((activity: Activity, index: number) => (
                    <React.Fragment key={index}>
                        <div className='activities-view__grid__row--title'>{activity.title}</div>
                        <div>{activity.durationInHours.toFixed(2)}</div>
                        <div>{activity.rate.toFixed(2)}</div>
                        <div>{activity.unitAmount.toFixed(2)}</div>
                        <div>{activity.amount.toFixed(2)} €</div>
                    </React.Fragment>
                ))}
            </div>

            <div className='activities-view__total-amount'>
                Total amount: {activities.reduce((totalAmount: number, activity: Activity) => totalAmount + activity.amount, 0)} €
            </div>
        </div>
    );
};

export default ActivitiesView;
