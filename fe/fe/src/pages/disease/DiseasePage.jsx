/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import 'antd/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './disease.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardComponent from './component/CardComponent';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { showErrorMessage } from '../../util/toastdisplay';
import { urls } from './data/Data';
import useAuth from '../../hooks/useAuth';
import { CHD, HV, HA, HF, HR, HMD, IHR } from './data/img';

function DiseasePage() {

  const { user } = useAuth();

  let username = user.sub;

  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        Description: "Coronary artery disease is a hardening of the arteries of the heart (arteriosclerosis).  It leads to a narrowing of the arteries as well as a reduction in the circulation of blood to the muscles of the heart and the symptoms associated with that.",
        DescriptionShort: "Coronary artery disease is a hardening of the arteries in the arteries of the heart and can cause circulatory disorders with accompanying chest pain (angina pectoris), a heart attack, or even sudden death from heart failure.",
        MedicalCondition: "Coronary artery disease is common predominantly in developed countries.  Risk factors for coronary artery disease and the same as those for arteriosclerosis:  high blood pressure (hypertension), smoking, increased blood lipid levels (especially cholesterol), age, heart attacks (in related family members), diabetes, being overweight, a diet rich in calories and fats, lack of exercise, and high levels of stress.  Decreased blood supply to the heart muscles leads to symptoms typical of angina pectoris with feelings of tightness in the chest and a pressure on the chest that radiates out to the throat or the left arm.  Symptoms may feel similar to those of heartburn.  Symptoms usually manifest during periods of effort, psychological stress, or in cold conditions and disappear within 15 minutes.",
        Name: "Coronary heart disease",
        PossibleSymptoms: "Chest pain,Chest tightness,Cold sweats,Going black before the eyes,Heartburn,Shortness of breath,Tiredness,Unconsciousness, short,Weight gain",
        ProfName: "Coronary artery disease",
        Synonyms: "CAD,ischemic heart disease,IHD,atherosclerotic heart disease,atherosclerotic cardiovascular disease",
        TreatmentDescription: "If a plaque built up in a vessel detaches, the coronary artery is then closed and cause a heart attack, which is the dying off of part of the heart’s own muscles caused by lack of blood.  Symptoms typically include intense, long-lasting angina pectoris that does not improve, accompanied by nausea, cold sweats, and shortness of breath.  In the worst case, a heart attack can lead to death, so if the above mentioned symptoms occur it is an emergency situation and a hospital visit is necessary.  In order to prevent coronary artery disease, it’s important to get regular daily exercise, eat a Mediterranean-style diet (little fat, lots of vegetables, fish, and fiber), avoiding nicotine (quitting is best), and keeping blood sugar, blood pressure, and blood lipid levels in check.  To clarify the causes for angina pectoris, you should visit a specialist in cardiology.  Treatment depends on the severity of the disease (see the article on heart attacks).",
        img: CHD,
      },
      {
        Description: "The heart includes the following four valves: aortic valve, tricuspid valve, mitral valve and pulmonary valve. When any of these valves do not function normally, this will be described as a disease of the heart valve.",
        DescriptionShort: "A disease of the heart valve describes the condition when one or several heart valves are not able to function normally. It can be either congenital or acquired. Minor forms of heart valve dysfunction do not need any treatment. However, surgery is necessary in severe cases.",
        MedicalCondition: "The causes of a disease of the heart valve can be either congenital or acquired. Congenital diseases of the heart valves often occur in the pulmonary valve and aortic valve, and acquired diseases of the heart valves often involve the aortic valve and mitral valve. Generally speaking, there are three common types of dysfunction of a heart valve: regurgitation, atresia and stenosis. Regurgitation occurs when the valves are unable to close adequately, and this leads to a flowing back of blood on every heartbeat. Stenosis means that the valves do not open regularly and therefore narrow the blood canal. This occurs when the valves thicken and become stiffer. Atresia means, that the channel where the valves are located is abnormally narrow and prevents blood flowing through. An often found hint for a disease of the heart valve is a heart murmur (heart sound). Depending on which valves are affected, patients may develop symptoms such as shortness of breath, dizziness, palpitations or swollen legs.",
        Name: "Diseases of the heart valves",
        PossibleSymptoms: "Palpitations,Shortness of breath,Night cough,Dizziness,Tiredness,Feeling faint",
        ProfName: "Valvulopathies",
        Synonyms: null,
        TreatmentDescription: "The symptoms of some heart valve diseases develop slowly and are minor at the beginning. Sometimes they do not need any treatment but controls at regular intervals. However, once treatment is necessary, it may include medication to reduce the symptoms and for protection of the affected heart and its valves from further damage. In some severe cases, repairmen or even replacement of the heart valve can be necessary.",
        img: HV,
      },
      {
        Description: "In the coronary artery disease, accumulation of material on the vessel walls can suddenly tear off and clog a coronary artery with the formation of blood clots.  This prevents the affected heart muscles from receiving sufficient oxygen and they begin to die.",
        DescriptionShort: "A heart attack is a part of the heart muscle dying off.  It is usually caused by a clogging of the a coronary artery which occurs when a plaque build up along the walls of a blood vessel (arteriosclerosis) detach itself.  A heart attack is an emergency situation.",
        MedicalCondition: "Heart attacks affect men twice as often as women and are usually associated with the hardening of the arteries (artherosclerosis).  Risk factors and precautionary measures can be found in the coronary artery disease article.  The signs of a heart attack include intense, long lasting chest pain (angina pectoris), with possible radiation into the throat or the left arm, usually associated with shortness of breath, feelings of anxiety, nausea, and a cold sweat.  Some people may feel pains around their stomach.  Triggers for a heart attack include vigorous physical effort, stressful situations and significant fluctuations in blood pressure.",
        Name: "Heart attack",
        PossibleSymptoms: "Shortness of breath,Unconsciousness, short,Chest pain,Chest tightness,Vomiting,Weight gain,Palpitations,Cold sweats,Tiredness,Going black before the eyes,Nausea",
        ProfName: "Myocardial infarction",
        Synonyms: "MI,acute myocardial infarction,AMI",
        TreatmentDescription: "If a heart attack is identified too late, the coronary muscle turns to scar tissue and can lead to heart failure, arrhythmia, or pulmonary edema (water in the lung).  A visit to the hospital is a must for anyone experiencing the symptoms named above.  If it’s treated soon enough, part of the heart muscle and the life of the patient can often be saved.  A small procedure to install a thin stent into the coronary artery can help to keep the clogged artery open and reestablish blood flow.  Stent or no, medications need to be taken throughout the rest of the individual’s life to prevent a second episode.  Medications may include aspirin, cholesterol lowering drugs, beta-blockers, or ACE inhibitors.",
        img: HA,
      },
      {
        Description: "Heart failure is a syndrome that can be caused by various conditions. Eventually, the heart is weakened up to a point where it can’t pump enough blood through the systemic circulation (left heart failure) or the lungs (right heart failure). So therefore it doesn't mean that it has stopped working, instead the pumping of blood is weaker than normal. The disorders which lead to a heart failure cannot all completely be healed, however the right treatment plan can help to alleviate the symptoms and signs of a heart failure. This in turn can help the patient to live longer than it would be the case without a treatment. With heart failure, blood moves at a slower rate through the heart and body, triggering an increase of the pressure in the heart. The result is that the heart cannot pump enough nutrients and oxygen to meet the body's needs. Heart failure is the major cause of hospitalization in people older than age 65.",
        DescriptionShort: "Heart failure, known sometimes as congestive heart failure, describes the result of a condition when the heart muscle cannot pump a sufficient amount of blood through the body. Some conditions, such as high blood pressure or narrowed arteries in the heart gradually lead the heart to become too stiff or weak to fill completely and pump efficiently.",
        MedicalCondition: "A left heart failure causes difficulty in breathing and coughing, first during physical strain, eventually also in an idle state. If the condition progresses further, the patient might only be able to breathe properly while sitting down or with propped-up arms. Other symptoms of left heart failure are reduced performance, weakness and memory impairment. Symptoms of right heart failure include swollen ankles, weight gain and sometimes a painful liver enlargement. Both forms of heart failure cause the patient to feel the need to go to the toilet frequently at night and heart palpitations.",
        Name: "Heart failure",
        PossibleSymptoms: "Changes in the nails,Chest pain,Chest tightness,Cough,Leg swelling,Night cough,Shortness of breath,Sputum,Unconsciousness, short,Urination during the night,Palpitations,Tiredness,Bloody cough,Reduced appetite,Absence of a pulse,Heart murmur,Distended abdomen,Blue colored skin,Ankle swelling,Irregular heartbeat,Physical inactivity,Cough with sputum,Weight gain,Nausea,Difficulty to concentrate,Blackening of vision,Feeling faint,Foot swelling,Breathing-related pains",
        ProfName: "Cardiac failure",
        Synonyms: "HF,Chronic heart failure,Congestive heart failure",
        TreatmentDescription: "There are numerous options available to treat this condition. The first steps include tight control over the lifestyle and medications of the patient to introduce suitable measures in addition to a careful monitoring. More advanced options of treatment can be offered by doctors specializing in the treatment of heart failure as the condition evolves. The objective of the treatment is to decrease the progression of the disease, to alleviate symptoms, and to enhance quality of life as unfortunately there is no complete cure for heart failure. The patient and his doctor can determine together the best option of treatment for him. It is recommended to talk to a general practitioner or a cardiologist.",
        img: HF,
      },
      {
        Description: "Palpitations are a clinical presentation more often in young women. It can be a symptom of harmless palpitations, for example caused by consuming coffee or tea, a harmless tachycardia (racing heartbeat), side effects of a medication (e.g. asthma medication such as Beta-2-Agonist), or non-organic conditions (e.g. panic disorders or somatisation disorder), or in rarer cases be caused by anaemia. A certain degree of stronger noticeable heartbeat is often harmless. For example lack of exercise or excitement can lead to a stronger perception of the heartbeat.",
        DescriptionShort: "Palpitation is the usually uncomfortable noticing of one’s heartbeat. The heartbeat is stronger (palpitations) and often too fast or irregular (skipped heartbeat). Palpitations may cause fear, but in most cases they are harmless. The heartbeat can be too fast, too slow, too strong or arrhythmic. \n",
        MedicalCondition: "Every person notices their own heartbeat every now and then; it can for example be a sign of excitement. However, some conditions can also lead to a noticeable heartbeat, e.g. heart conditions such as heart valve defects or excitation propagation disorders (cardiac arrhythmias). Circulatory system conditions, especially hypertension, but also lack of exercise can lead to palpitations. Diseases of the thyroid gland, especially hyperthyroidism leads to noticeable heartbeat as often as alcohol, various medications or psychological disorders (e.g. panic attacks).",
        Name: "Heart racing",
        PossibleSymptoms: "Palpitations",
        ProfName: "Palpitations",
        Synonyms: "Palpitation",
        TreatmentDescription: "In most cases, noticing one’s heartbeat is harmless. However, should it occur frequently, a doctor should be consulted for an examination to rule out possible illnesses as the cause for the palpitations. The therapy will then depend on the identified cause.",
        img: HR,
      },
      {
        Description: "All cardiomyopathies have in common, that a malfunction of the heart develops. These are usually pump dysfunctions that, depending on the type of cardiomyopathy, either cause lesser amounts of blood being pumped into the body circulation due to the heart muscle’s insufficient strength, or lesser amounts of blood being pumped into the lung circulation due to e.g. the respective heart cavity became too small.",
        DescriptionShort: "The condition of cardiomyopathy combines a number of heart-muscle conditions that lead to a decreasing functioning of the heart, therefore developing a cardiomyopathy.",
        MedicalCondition: "There are 5 main types of cardiomyopathy. A dilative cardiomyopathy (“sacculation“ and enlargement of the heart, so that lesser amounts of blood are being pumped into the body circulation) occurs due to genetic factors, as part of circulatory disorders of the heart (coronary heart disease) and heart attack, following virus infections. Patients suffer from breathlessness, cardiac arrhythmia and general symptoms such as weakness and fatigue. Hypertrophic cardiomyopathy leads to a thickening musculature mainly of the left heart, without gaining any strength. On the contrary, muscle strength rather decreases! The result is a decrease in the amount of blood being pumped into the body circulation, due to the reduced muscle strength (non-obstructive type) or due to movements/tightening of the blood’s path (obstructive type). Hypertrophic cardiomyopathy also shows symptoms such as breathlessness under strain, cardiac arrhythmia and the general symptoms mentioned above. Restrictive cardiomyopathy occurs when the heart muscle becomes very stiff. It can’t be filled with the sufficient amount of blood anymore, and the blood accumulates in front of the heart. This also leads to breathlessness, but also to an enlarged liver and spleen and may cause dysfunctions. Patients also suffer from swollen and heavy legs. The fourth type is arrhythmogenic right ventricular cardiomyopathy. When suffering from this type, heart muscle tissue is being more and more replaced by fatty and connective tissue. This tissue is less durable and tends to sag out, similar to the dilative cardiomyopathy. Fatty and connective tissue also doesn’t have the functions of muscle tissue and can’t contract to pump blood into the circulation. Patients suffer from short periods of unconsciousness, irregular heartbeat and heart palpitations. The fifth type is non-classifiable cardiomyopathies. All types can lead to sudden cardiac death.",
        Name: "Heart muscle disease",
        PossibleSymptoms: "Shortness of breath,Leg swelling,Cough,Tiredness,Palpitations,Chest pain,Dizziness,Unconsciousness, short,Feeling faint,Heart murmur,Irregular heartbeat,Blue colored skin,Foot swelling",
        ProfName: "Cardiomyopathies",
        Synonyms: null,
        TreatmentDescription: "Some examinations are required to identify the type of cardiomyopathy. The symptoms provide a first idea. One of the first measures is usually an ECG and the analysis thereof, followed by chest x-rays as well as a heart ultrasound. The blood parameters will be determined, and a catheter examination of the heart or a sample taking may be considered as well. Therapy and prognosis depend on the identified type of cardiomyopathy. All measures include omission of substances or habits that can damage the heart (alcohol, smoking, certain medication), as well as rest. Cardiac insufficiency will be treated as well, but with different approaches. Additional specific measures are necessary for the respective types. This may include therapy of the underlying cause, pacemaker implantation, surgeries or even a heart transplant. The doctor will discuss the individual therapy with the patient. All cardiomyopathies are serious conditions that can strongly impair the patients’ daily activities and require intensive therapy, depending on the stage of severity. Despite all options, sudden cardiac death or other life-threatening complications occur frequently.",
        img: HMD,
      },
      {
        Description: "Atrial fibrillation is a temporary or lasting arrhythmia of the heart in which the atrial chambers of the heart can't pump optimally. This leads to heart chambers, which don’t fill enough and which caused the typical complaints.",
        DescriptionShort: "Atrial fibrillation is a trouble of the heart’s normal rhythm, whereby the atrium (of the heart) isn't able to pump optimally. Patients may experience heart palpitations and shortness of breath or even temporarily loss of consciousness.",
        MedicalCondition: "Atrial fibrillation may intermittently occur in healthy people and more often in patients with a known cardiac disorder. Atrial fibrillation often goes unnoticed in those with it. Still, palpitations, a racing heart, feelings of dizziness, shortness of breath, and even momentary unconsciousness may occur.",
        Name: "Irregular heart rhythm in atria",
        PossibleSymptoms: "Palpitations,Blackening of vision,Unconsciousness, short,Frequent urination,Tiredness,Shortness of breath,Dizziness,Chest pain,Anxiety,Irregular heartbeat,Feeling faint",
        ProfName: "Atrial fibrillation",
        Synonyms: "Irregular heart rhythm involving heart chambers",
        TreatmentDescription: "Occasionally a blood clot may form in the atrium, and leave the atria leading to a stroke (cerebrovascular accident). Therefore patients are treated with blood-thinning drugs (mostly Marcoumar or Sintrom). The further treatment aims to keep the heart rate between 60 and 100 beats per minute, so that the heart can pump effectively. This may be attempted with medication, a pacemaker or a so-called cardioversion.",
        img: IHR,
      },
    ]);
  }, [])

  return (
    <Container>
      <p
        style={{ font: '2rem TTNormsPro,Verdana,sans-serif', color: '#02555b', }}>
        Good day, {username}
      </p>
      <Row>
        {data.map(card => {
          return (
            // eslint-disable-next-line react/jsx-key
            <Col style={{ paddingBottom: '2rem' }}>
              <CardComponent data={card} />
            </Col>
          )
        })}
      </Row>
    </Container>
  );
}

export default DiseasePage;
