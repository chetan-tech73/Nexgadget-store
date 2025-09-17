export default function TrustBadge( props ) {
    const Icon = props.icon;
    const { title, subtitle } = props;


    return (
        <div className="flex items-start space-x-4">
            <Icon className="h-8 w-8 text-purple-700 flex-shrink-0" />
        <div>
        <h3 className="font-semibold text-base">{title}</h3>
        <p className="text-gray-500 text-sm leading-snug">{subtitle}</p>
        </div>
        </div>
    );
}