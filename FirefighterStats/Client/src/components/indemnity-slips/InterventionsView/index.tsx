import './style.scss';
import Intervention from '../../../types/Intervention';
import React from 'react';
import { displayDateTimes } from '../../../utils/DateTime';
import EInterventionType, { getAbbreviation } from '../../../types/EInterventionType';

interface IInterventionsViewProps {
    interventions: Intervention[];
}

const InterventionsView = ({ interventions }: IInterventionsViewProps) => {
    return (
        <div className='interventions-view'>
            <div className='interventions-view__grid'>
                <div />
                <div />
                <div />
                <div className='interventions-view__grid__header duration-header'>Durations (in hour)</div>
                <div />
                <div className='interventions-view__grid__header number-header'>Number</div>
                <div className='interventions-view__grid__header title-header'>Title</div>
                <div className='interventions-view__grid__header'>Type</div>
                <div className='interventions-view__grid__header'>Normal</div>
                <div className='interventions-view__grid__header'>Dim. JF</div>
                <div className='interventions-view__grid__header'>Nuit</div>
                <div className='interventions-view__grid__header total-duration-header'>Total duration</div>
                <div className='interventions-view__grid__header amount-header'>Amount €</div>

                {interventions.map((intervention: Intervention, index: number) => (
                    <React.Fragment key={index}>
                        <div className='interventions-view__grid__item'>{intervention.number}</div>
                        <div className='interventions-view__grid__item--title'>
                            {intervention.title} from {displayDateTimes(intervention)}
                        </div>
                        <div className={`interventions-view__grid__item--type interventions-view__grid__item--type--${intervention.interventionType}`}>
                            {getAbbreviation(intervention.interventionType as keyof typeof EInterventionType)}
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
                Total : {Number(interventions.reduce((totalAmount: number, intervention: Intervention) => totalAmount + intervention.amount, 0).toFixed(2))} €
            </div>
        </div>
    );
};

export default InterventionsView;
