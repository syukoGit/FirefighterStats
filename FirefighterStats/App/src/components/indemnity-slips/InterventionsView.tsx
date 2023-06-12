import './InterventionsView.scss';
import Intervention from '../../types/Intervention';
import React from 'react';
import { displayDateTimes } from '../../utils/DateTime';

interface IInterventionsViewProps {
    interventions: Intervention[];
}

const InterventionsView = ({ interventions }: IInterventionsViewProps) => {
    return (
        <div className='interventions-view'>
            <h2 className='interventions-view__title'>Interventions</h2>
            <div className='interventions-view__grid'>
                <div />
                <div className='interventions-view__grid__header duration-header'>Durations (in hour)</div>
                <div />
                <div className='interventions-view__grid__header interventions-view__grid__header--title'>Title</div>
                <div className='interventions-view__grid__header'>Normal</div>
                <div className='interventions-view__grid__header'>Dim. JF</div>
                <div className='interventions-view__grid__header'>Nuit</div>
                <div className='interventions-view__grid__header'>Total duration</div>
                <div className='interventions-view__grid__header'>Amount €</div>

                {interventions.map((intervention: Intervention, index: number) => (
                    <React.Fragment key={index}>
                        <div className='interventions-view__grid__row--title'>
                            {intervention.number} | {intervention.title} from {displayDateTimes(intervention)}
                        </div>
                        <div>{intervention.dayHours === 0 ? undefined : intervention.dayHours.toFixed(2)}</div>
                        <div>{intervention.specialHours === 0 ? undefined : intervention.specialHours.toFixed(2)}</div>
                        <div>{intervention.nightHours === 0 ? undefined : intervention.nightHours.toFixed(2)}</div>
                        <div>{intervention.totalHours.toFixed(2)}</div>
                        <div>{intervention.amount.toFixed(2)} €</div>
                    </React.Fragment>
                ))}
            </div>
            <div className='interventions-view__total-amount'>
                Total amount: {interventions.reduce((totalAmount: number, intervention: Intervention) => totalAmount + intervention.amount, 0)} €
            </div>
        </div>
    );
};

export default InterventionsView;
