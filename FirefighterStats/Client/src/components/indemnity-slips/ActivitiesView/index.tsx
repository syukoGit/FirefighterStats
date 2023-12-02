import './style.scss';
import Activity, { NewActivity, getNewActivityPreview, isActivity } from '../../../types/Activity';
import React from 'react';
import { displayDateTimes } from '../../../utils/DateTime';

interface IActivitiesViewProps {
    activities: (Activity | NewActivity)[];
}

const ActivitiesView = ({ activities }: IActivitiesViewProps) => {
    const activitiesToDisplay = activities.map((activity) => {
        if (isActivity(activity)) {
            return activity;
        } else {
            return getNewActivityPreview(activity);
        }
    });

    return (
        <div className='activities-view'>
            <div className='activities-view__grid'>
                <div className='activities-view__grid__header'>Title</div>
                <div className='activities-view__grid__header'>Duration (in hour)</div>
                <div className='activities-view__grid__header'>Rate %</div>
                <div className='activities-view__grid__header'>Unit amount</div>
                <div className='activities-view__grid__header amount-header'>Amount €</div>

                {activitiesToDisplay.map((activity: Activity, index: number) => (
                    <React.Fragment key={index}>
                        <div className='activities-view__grid__row--title'>
                            {activity.title} from {displayDateTimes(activity)}
                        </div>
                        <div>{activity.durationInHours.toFixed(2)}</div>
                        <div>{activity.rate.toFixed(2)}</div>
                        <div>{activity.unitAmount.toFixed(2)}</div>
                        <div>{activity.amount.toFixed(2)} €</div>
                    </React.Fragment>
                ))}
            </div>

            <div className='activities-view__total-amount'>
                Total : {activitiesToDisplay.reduce((totalAmount: number, activity: Activity) => totalAmount + activity.amount, 0)} €
            </div>
        </div>
    );
};

export default ActivitiesView;
